import { useForm } from "react-hook-form";

import { IUseAction } from "./types";
import { useAppSelector } from "@/components/src/redux/hooks";

const useAction = (props: IUseAction) => {
  const { user, actionMode } = useAppSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm({ defaultValues: user });

  const onSubmit = handleSubmit((data) => {
    console.log('data: ', data);
    // TODO: Submit Add or Edit data
  })

  return {
    register,
    getValues,
    setValue,
    errors,
    onSubmit
  }
}

export default useAction;
