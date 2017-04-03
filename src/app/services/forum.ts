export type Forums = Forum[];

export interface Forum {
  title: string;
  createdDate: Date | string;
  modifiedDate?: Date | string;
  description?: string;
  discussions?: [{ [key: string]: boolean }];
}