import { reset } from "@/components/src/redux/features/userSelect";
import { useAppDispatch, useAppSelector } from "@/components/src/redux/hooks";
import { useDeleteUserMutation } from "@/components/src/redux/services/users"

const useAction = () => {
  const dispatch = useAppDispatch()
  const { user: { username = "" } } = useAppSelector((state) => state.userReducer);

  const [onExec, { isLoading, error, data, isSuccess }] = useDeleteUserMutation();

  const onConfirm = () => onExec({ username })
  const onReset = () => dispatch(reset());

  return {
    // @ts-ignore
    error: error?.data?.error,
    data,
    username,
    isLoading,
    isSuccess,
    onConfirm,
    onReset
  }
}

export default useAction;
