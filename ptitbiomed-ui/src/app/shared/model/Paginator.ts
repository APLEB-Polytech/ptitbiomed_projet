export interface IPaginator<T> {
  data: T[];
  pageSize: number;
  itemMax: number;
  actualPage: number;
}


