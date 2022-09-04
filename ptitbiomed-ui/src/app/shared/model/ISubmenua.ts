import {ISubmenub} from "./ISubmenub";

export interface ISubmenua {
  id: number | undefined,
  label: string,
  link: string | undefined,
  idArticle?: string
  submenubs: ISubmenub[] | undefined
}

export class Submenua implements ISubmenua {
  constructor(public label: string, public idParent: number) {}

  id: number | undefined;
  link: string | undefined;
  submenubs: ISubmenub[] | undefined;
  idArticle?: string
}
