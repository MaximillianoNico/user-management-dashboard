import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../screens/user-list/types";

interface IAppStore {
  user: IUser
  isOpenModal: boolean
  actionMode: 'add' | 'edit' | 'delete'
}

interface IPayloadUser {
  user: IUser
  mode: 'add' | 'edit' | 'delete'
}

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    username: ""
  },
  isOpenModal: false,
  actionMode: 'add',
} as IAppStore;

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: () => initialState,
    onActionUser: (state, action: PayloadAction<IPayloadUser>) => {
      const newUser = action.payload;
      
      state.actionMode = newUser.mode;
      state.user = newUser.user;
      state.isOpenModal = true;
    }
  },
});

export const {
  onActionUser,
  reset,
} = users.actions;
export default users.reducer;
