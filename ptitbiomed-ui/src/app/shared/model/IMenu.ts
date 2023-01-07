
export interface IMenu {
  id?: number,
  label: string,
  link?: string,
  rank: number,
  idArticle?: string,
  idCategory?: string,
  idParent?: number,
  hidden: boolean,
}
