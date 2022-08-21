import {ISubmenua} from "./ISubmenua";

export interface IMenu {
  id: number,
  label: string,
  link: string,
  rank: number,
  submenuas: ISubmenua[]
}
