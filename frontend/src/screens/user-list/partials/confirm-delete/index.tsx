import { Modal } from "antd"
import { FC } from "react"
import { IConfirmDelete } from "./types";
import { useAppDispatch, useAppSelector } from "@/components/src/redux/hooks";
import { reset } from "@/components/src/redux/features/userSelect";

const Component:FC<IConfirmDelete> = (props) => {
  const { user: { username = "" } } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch()

  return (
    <Modal
      title="Confirm Delete"
      open={props?.open}
      onOk={() => dispatch(reset())}
      onCancel={() => dispatch(reset())}>
      <p>Do you want to delete username {username}</p>
    </Modal>
  )
}

export default Component;
