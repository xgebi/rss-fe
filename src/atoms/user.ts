import { atom } from "recoil";
import { User } from "../types/User";

export const UserState = atom<User>({
    key: 'userState',
    default: {
      id: "",
      name: "",
      displayName: "",
      token: "",
    },
  });