import { Alert, Input, Modal } from "antd"
import { FC, useMemo, useState } from "react"

import { Container, AvatarWrapper, UsernameTruncate, Avatar } from "./styles"
import { InputGroup, InputLabel } from "@/components/src/components/input-group"
import useAction from "./actions"
import { ErrorMessage } from "@hookform/error-message";
import { IEditForm } from "../../types"
import { useAppSelector } from "@/components/src/redux/hooks"

const Component:FC<IEditForm> = (props) => {
  const [isErrorCreate, setIsErrorCreate] = useState<any>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const actionMode = useAppSelector((state) => state.userReducer.actionMode);

  const cbHooks = {
    onFailed: (err: any) => {
      setIsErrorCreate(err)
    },
    onSuccess: () => {
      setIsSuccess(true);
      setIsErrorCreate(null);

      setTimeout(() => {
        if (typeof props?.onClose === 'function') props?.onClose(true);
      }, 1500)
    },
    watch: props?.open
  }
  const { onSubmit, register, errors, getValues, setValue, isLoading } = useAction(cbHooks);

  const title = useMemo(
    () => {
      const mode = (actionMode ?? "add")
      
      return `${mode.charAt(0).toUpperCase() + mode.slice(1)} User`
    },
    [actionMode]
  )

  return (
    <Modal
      title={title}
      open={props?.open}
      okText={isLoading ? "Loading..." : "Save"}
      cancelText="Cancel"
      onOk={onSubmit}
      onCancel={() => props?.onClose()}
    >
      {isSuccess && <Alert message={"Successfuly "+ title} type="success" />}
      {isErrorCreate && <Alert message={isErrorCreate?.data?.error} type="error" />}
      <Container>
        <AvatarWrapper>
          <Avatar size="large">
            <UsernameTruncate>M</UsernameTruncate>
          </Avatar>
        </AvatarWrapper>
        <div>
          {actionMode === 'add' && (
            <>
              <InputGroup>
                <InputLabel>Username</InputLabel>
                <Input {
                  ...register(
                    "username",
                    {
                      required: {
                        value: true,
                        message: "Username is required"
                      },
                      minLength: { value: 4, message: "Min 4 character"},
                      maxLength: { value: 44, message: 'Max 44 character'}
                    }
                  )
                }
                defaultValue={getValues('username')}
                onChange={(e) => setValue('username', e.target.value)}
                placeholder="username" />
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => <p style={{ color: 'red'}}>{message}</p>}
              />
            </>
          )}
          <InputGroup $marginTop={actionMode === 'add' ? '10px' : ''}>
            <InputLabel>Firstname</InputLabel>
            <Input
              {
                ...register(
                  "firstname",
                  {
                    required: {
                      value: true,
                      message: "Firstname is required"
                    },
                    minLength: { value: 4, message: "Min 4 character"},
                    maxLength: { value: 48, message: 'Max 48 character'}
                  }
                )
              }
              defaultValue={getValues('firstname')}
              onChange={(e) => setValue('firstname', e.target.value)}
              placeholder="first name"
            />
          </InputGroup>
          <ErrorMessage
            errors={errors}
            name="firstname"
            render={({ message }) => <p style={{ color: 'red'}}>{message}</p>}
          />

          <InputGroup $marginTop="10px">
            <InputLabel>Lastname</InputLabel>
            <Input
              {
                ...register(
                  "lastname",
                  {
                    required: {
                      value: true,
                      message: "Lastname is required"
                    },
                    maxLength: {
                      value: 55,
                      message: 'Max 55 character'
                    }
                  }
                )
              }
              defaultValue={getValues('lastname')}
              onChange={(e) => setValue('lastname', e.target.value)}
              placeholder="last name" />
          </InputGroup>
          <ErrorMessage
            errors={errors}
            name="lastname"
            render={({ message }) => <p style={{ color: 'red'}}>{message}</p>}
          />
        </div>
      </Container>
    </Modal>
  )
}

export default Component;
