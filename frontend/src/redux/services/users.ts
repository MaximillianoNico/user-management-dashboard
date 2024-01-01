import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../screens/user-list/types";
import { IBasicResponse, ICreateUserResponse } from "./types";

export const REDUCER_PATH = "user_api"

export const userAPI = createApi({
  reducerPath: REDUCER_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/users"}),
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => ({
        url: "/",
        method: "GET"
      }),
      transformResponse: (rawResult: { data: IUser[] }) => {
        return rawResult.data
      },
    }),
    addNewUser: builder.mutation<ICreateUserResponse, IUser>({
      query: (payload) => ({
        url: '/new',
        method: 'POST',
        body: payload
      }),
    }),
    editUser: builder.mutation<IBasicResponse, IUser>({
      query: (payload) => ({
        url: '/update',
        method: 'PATCH',
        body: payload
      })
    }),
    deleteUser: builder.mutation<IBasicResponse, { username: string}>({
      query: (payload) => ({
        url: "delete",
        method: "DELETE",
        body: payload
      })
    })
  })
})

export const {
  useGetUserListQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useDeleteUserMutation
} = userAPI;