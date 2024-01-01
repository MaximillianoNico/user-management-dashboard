import { IUser } from "../../screens/user-list/types"

interface ISuccessResponse {
  message?: string
}

interface IErrorResponse {
  error?: string
}

export interface ICreateUserResponse
  extends ISuccessResponse, IErrorResponse{
  data: IUser
}

export interface IBasicResponse
  extends ISuccessResponse, IErrorResponse {}