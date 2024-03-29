export interface IArticle {
  uuid: string | undefined;
  creationTime: Date | undefined;
  updateTime: Date | undefined;
  author: string;
  title: string;
  html: string | undefined;
  menuArticle?: MenuArticle
}

export class Article implements IArticle {
  constructor(public author: string, public title: string, public html: string) {
  }

  creationTime: Date | undefined;
  updateTime: Date | undefined;
  uuid: string | undefined;
}

export interface MenuArticle {
  idMenu?: number,
  idSousMenu?: number
}
