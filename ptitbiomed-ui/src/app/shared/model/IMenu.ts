import {ISubmenua} from "./ISubmenua";
import {MenuGeneral} from "./menuGeneral.model";

export interface IMenu extends MenuGeneral {
  id?: number,
  label: string,
  link?: string,
  rank: number,
  idArticle?: string,
  submenuas?: ISubmenua[]
}

export class Menu implements IMenu {
  constructor(public label: string, public rank: number) {}

  id: number | undefined;
  link: string | undefined;
  submenuas: ISubmenua[] | undefined;
  idArticle?: string
  submenuab: ISubmenua[] | undefined;
}
