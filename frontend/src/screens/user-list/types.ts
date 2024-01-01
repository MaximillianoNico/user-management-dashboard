export interface IUser {
  lastname?: string
  firstname?: string
  username?: string
}

export interface IEditForm {
  open?: boolean
  onClose?: () => void
}