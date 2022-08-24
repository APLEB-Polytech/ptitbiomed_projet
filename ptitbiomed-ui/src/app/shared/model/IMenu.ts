import {ISubmenua} from "./ISubmenua";

export interface IMenu {
  id: number | undefined,
  label: string,
  link: string | undefined,
  rank: number,
  submenuas: ISubmenua[] | undefined
}

export class Menu implements IMenu {
  constructor(public label: string, public rank: number) {}

  id: number | undefined;
  link: string | undefined;
  submenuas: ISubmenua[] | undefined;
}
