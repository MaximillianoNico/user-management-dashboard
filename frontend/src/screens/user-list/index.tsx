"use client"
import { Avatar, Button } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Container, Card, Center, InputChecked, Title, Body, Subtitle, Header, EmptyState } from "./styles";

import AddEditForm from '@/components/src/screens/user-list/partials/add-edit-form'
import ConfirmDelete from '@/components/src/screens/user-list/partials/confirm-delete'
import UserCard from '@/components/src/screens/user-list/partials/user-card'

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
          {data?.length ? data?.map(
            (dataUser) => (
              <UserCard
                {...dataUser}
                key={dataUser.user_id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          ) : (<EmptyState>Users list is empty</EmptyState>)}
        </div>
      </Container>

      {/* Modal Confirm */}
      {(isOpenModal && actionMode === 'delete') && (
        <ConfirmDelete
          open={isOpenModal && actionMode === 'delete'}
          onSuccess={() => {
            dispatch(reset())
            onReload()
          }}
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
