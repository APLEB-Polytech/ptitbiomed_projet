import {IRole} from "./IRole";

export interface IUser {
  id: number
  username: string
  email: string
  roles: IRole[]
}
