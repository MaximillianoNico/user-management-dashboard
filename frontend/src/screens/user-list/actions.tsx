import { useGetUserListQuery } from "../../redux/services/users";
import { useAppDispatch } from "../../redux/hooks";
import { onActionUser } from "../../redux/features/userSelect";
import { IUser } from "./types";

const useAction = () => {
  const { data, isLoading, refetch } = useGetUserListQuery({});
  const dispatch = useAppDispatch()

  const onAddNew = () => dispatch(
    onActionUser({
      user: {
        username: ""
      },
      mode: "add"
    })
  )
  
  const onEdit = (userData: IUser) => dispatch(
    onActionUser({
      user: userData,
      mode: 'edit',
    })
  )

  const onDelete = (userName?: string) => dispatch(
    onActionUser(
      {
        user: { username: userName },
        mode: "delete"
      }
    )
  )

  const onReload = () => refetch()

  return {
    data,
    isLoading,
    onAddNew,
    onEdit,
    onDelete,
    onReload
  }
}

export default useAction;
