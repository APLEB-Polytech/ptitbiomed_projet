import {ISubmenub} from "./ISubmenub";

export interface ISubmenua {
  id: number,
  label: string,
  link: string,
  submenubs: ISubmenub[]
}
