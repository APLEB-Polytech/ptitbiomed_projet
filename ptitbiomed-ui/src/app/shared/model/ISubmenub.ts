import {MenuGeneral} from "./menuGeneral.model";

export interface ISubmenub extends MenuGeneral {
  id: number,
  label: string,
  link: string,
  idArticle?: string
}
