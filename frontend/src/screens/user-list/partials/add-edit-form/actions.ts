import { useForm } from "react-hook-form";

import { IUseAction } from "./types";
import { useAppSelector } from "@/components/src/redux/hooks";
import { useAddNewUserMutation, useEditUserMutation } from "@/components/src/redux/services/users";

const useAction = (props: IUseAction) => {
  const { user, actionMode } = useAppSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm({ defaultValues: user });

  const useMutation = actionMode === 'add' ? useAddNewUserMutation : useEditUserMutation;
  const [onExec, { isLoading }] = useMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onExec(data).unwrap();
      
      if (typeof props?.onSuccess === 'function') {
        props?.onSuccess();
      }
    } catch (err: any) {
      console.log('Err: ', err);
      if (typeof props?.onFailed === 'function') {
        props?.onFailed(err);
      }
    }
  })

  return {
    isLoading,
    register,
    getValues,
    setValue,
    errors,
    onSubmit
  }
}

export default useAction;
