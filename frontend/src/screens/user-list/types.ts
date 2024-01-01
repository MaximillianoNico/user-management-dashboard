export interface IUser {
  user_id?: string
  lastname?: string
  firstname?: string
  username?: string
}

export interface IEditForm {
  open?: boolean
  onClose: (isRefetch?: boolean) => void
}