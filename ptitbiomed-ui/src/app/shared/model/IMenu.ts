
export interface IMenu {
  id?: number,
  label: string,
  link?: string,
  rank: number,
  idArticle?: string,
  idCategory?: string,
  idParent?: number,
}

export class Menu implements IMenu {
  constructor(public label: string,
              public rank: number) {}
}
