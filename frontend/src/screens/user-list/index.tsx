"use client"
import { Avatar, Button } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Container, Card, Center, InputChecked, Title, Body, Subtitle, Header } from "./styles";

import AddEditForm from '@/components/src/screens/user-list/partials/add-edit-form'
import ConfirmDelete from '@/components/src/screens/user-list/partials/confirm-delete'

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { reset } from "../../redux/features/userSelect";
import Colors from '../../helpers/color';
import useAction from "./actions";

const Component = () => {
  const { isOpenModal, actionMode } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch()

  const { data, onAddNew, onEdit, onDelete, onReload } = useAction();
  
  return (
    <Layout>
      <Container>
        <Header>
          <h2>User List</h2>
          <Button onClick={onAddNew}>Add New</Button>
        </Header>
        <div>
          {data?.map(
            ({ username, firstname, lastname, user_id }) => (
              <Card key={user_id} $active>
                <Center>
                  <InputChecked type="checkbox" />
                </Center>
                <Center>
                  <Avatar style={{ backgroundColor: Colors.Random() }} size="large">
                    {firstname?.split('')[0]?.toUpperCase()}
                  </Avatar>
                </Center>
                <Body>
                  <Title>{username}</Title>
                  <Subtitle>{firstname} {lastname}</Subtitle>
                </Body>
                <Center $gap="10px">
                  <EditOutlined
                    onClick={() => onEdit({
                      username,
                      firstname,
                      lastname
                    })}
                    style={{ cursor: 'pointer' }}
                    size={26}
                  />
                  <DeleteOutlined
                    onClick={() => onDelete(username)}
                    style={{ cursor: 'pointer' }}
                    size={26}
                  />
                </Center>
              </Card>
            )
          )}
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
          onClose={(isRefetch) => {
            dispatch(reset())

            if (isRefetch) onReload()
          }}
        />
      )}
    </Layout>
  )
}

export default Component;
