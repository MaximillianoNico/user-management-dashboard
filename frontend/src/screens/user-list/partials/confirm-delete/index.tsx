import { Alert, Modal } from "antd"
import { FC, useEffect } from "react"
import { IConfirmDelete } from "./types";
import useAction from "./actions";

const Component:FC<IConfirmDelete> = (props) => {
  const { onReset, onConfirm, username, isSuccess, error } = useAction();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        if (typeof props?.onSuccess === 'function') props?.onSuccess();
      }, 1500)
    }
  }, [isSuccess, props]);
  
  return (
    <Modal
      title="Confirm Delete"
      open={props?.open}
      onOk={onConfirm}
      onCancel={onReset}>

      {isSuccess && <Alert message={"Successfuly Delete"} type="success" />}
      {error && <Alert message={error} type="error" />}
      <p>Do you want to delete username {username}</p>
    </Modal>
  )
}

export default Component;
