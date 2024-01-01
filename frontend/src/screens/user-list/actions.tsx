import { ChangeEvent, useState } from "react"
import { useGetUserListQuery } from "../../redux/services/users";

export const useDelete = () => {
  const [usernameSelect, setUsernameSelect] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = (username: string) => {
    setUsernameSelect(username);
    setIsOpen(true);
  }

  const onConfirm = () => {
    setIsOpen(false);
  }

  const onCancel = () => {
    setIsOpen(false);
  }

  return {
    usernameSelect,
    isOpen,
    onClick,
    onCancel,
    onConfirm
  }
}

export const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onToggle = () => setOpen(prev => !prev);

  return { open, onToggle }
}

interface IUser {
  lastname?: string
  firstname?: string
  username?: string
}

export const useEdit = () => {
  const [user, setUser] = useState<IUser>({})

  const onOpen = (username: string) => {
    setUser({ username })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e?.target?.name;
    const value = e?.target?.value;

    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = () => {}

  return {
    onChange,
    onOpen,
    onSubmit,
    user
  }
}

const useAction = () => {
  const { data, isLoading } = useGetUserListQuery({});

  return {
    data, isLoading
  }
}

export default useAction;
