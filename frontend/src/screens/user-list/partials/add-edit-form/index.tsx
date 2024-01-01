import { Input, Modal } from "antd"
import { FC, useMemo } from "react"

import { Container, AvatarWrapper, UsernameTruncate, Avatar } from "./styles"
import { InputGroup, InputLabel } from "@/components/src/components/input-group"
import useAction from "./actions"
import { ErrorMessage } from "@hookform/error-message";
import { IEditForm } from "../../types"
import { useAppSelector } from "@/components/src/redux/hooks"

const Component:FC<IEditForm> = (props) => {
  const { actionMode } = useAppSelector((state) => state.userReducer);
  const { onSubmit, register, errors, getValues, setValue } = useAction({
    onFailed: () => props?.onClose,
    onSuccess: () => props?.onClose,
    watch: props?.open
  });

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
      okText="Save"
      cancelText="Cancel"
      onOk={onSubmit}
      onCancel={props?.onClose}
    >
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
                value={getValues('username')}
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
              value={getValues('firstname')}
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
              value={getValues('lastname')}
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
