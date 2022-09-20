import {ISubmenua} from "./ISubmenua";

export interface MenuGeneral {
  id?: number,
  label: string,
  link?: string,
  rank?: number,
  idArticle?: string,
  submenuas?: ISubmenua[]
  submenuab?: ISubmenua[]
}
