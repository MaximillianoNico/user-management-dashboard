"use client"
import { Avatar, Button } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Container, Card, Center, InputChecked, Title, Body, Subtitle, Header } from "./styles";

import AddEditForm from '@/components/src/screens/user-list/partials/add-edit-form'
import ConfirmDelete from '@/components/src/screens/user-list/partials/confirm-delete'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onActionUser, reset } from "../../redux/features/userSelect";

const Component = () => {
  const { isOpenModal, actionMode } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch()
  
  return (
    <Layout>
      <Container>
        <Header>
          <h2>User List</h2>
          <Button
            onClick={
              () => dispatch(
                onActionUser({
                  user: {
                    username: "",
                  },
                  mode: 'add'
                })
              )
            }
          >Add New</Button>
        </Header>
        <div>
          <Card $active>
            <Center>
              <InputChecked type="checkbox" />
            </Center>
            <Center>
              <Avatar style={{ backgroundColor: "blue", verticalAlign: 'middle' }} size="large">
                M
              </Avatar>
            </Center>
            <Body>
              <Title>Max</Title>
              <Subtitle>maximillianonico8@gmail.com</Subtitle>
            </Body>
            <Center $gap="10px">
              <EditOutlined onClick={() => {
                dispatch(
                  onActionUser({
                    user: {
                      username: "Max",
                      firstname: "MAX-1",
                      lastname: "MAX-LAST"
                    },
                    mode: 'edit'
                  })
                )
              }} style={{ cursor: 'pointer' }} size={26} />
              <DeleteOutlined onClick={() => dispatch(onActionUser({ user: { username: "max" }, mode: "delete"}))} style={{ cursor: 'pointer' }} size={26} />
            </Center>
          </Card>

          <Card>
            <Center>
              <InputChecked type="checkbox" />
            </Center>
            <Center>
              <Avatar style={{ backgroundColor: "blue", verticalAlign: 'middle' }} size="large">
                M
              </Avatar>
            </Center>
            <Body>
              <Title>Max</Title>
              <Subtitle>maximillianonico8@gmail.com</Subtitle>
            </Body>
            <Center $gap="10px">
              <EditOutlined style={{ cursor: 'pointer' }} size={26} />
              <DeleteOutlined style={{ cursor: 'pointer' }} size={26} />
            </Center>
          </Card>
        </div>
      </Container>

      {/* Modal Confirm */}
      {(isOpenModal && actionMode === 'delete') && (
        <ConfirmDelete
          open={isOpenModal && actionMode === 'delete'}
          onSuccess={() => {}}
        />
      )}

      {/* Modal Delete */}
      {(isOpenModal  && actionMode !== 'delete') && (
        <AddEditForm
          open={isOpenModal}
          onClose={() => dispatch(reset())}
        />
      )}
    </Layout>
  )
}

export default Component;
