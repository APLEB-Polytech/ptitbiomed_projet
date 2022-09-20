import {ISubmenub} from "./ISubmenub";
import {MenuGeneral} from "./menuGeneral.model";

export interface ISubmenua extends MenuGeneral {
  id: number | undefined,
  label: string,
  link: string | undefined,
  idArticle?: string
  submenubs?: ISubmenub[]
}

export class Submenua implements ISubmenua {
  submenuab: ISubmenua[] | undefined;

  id: number | undefined;
  link: string | undefined;
  submenubs: ISubmenub[] | undefined;
  idArticle?: string
  submenuas: ISubmenua[] | undefined;

  constructor(public label: string, public idParent: number, public rank: number) {
  }
}
