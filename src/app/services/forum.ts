export type Forums = Forum[];

export interface Forum {
  id: string;
  title: string;
  createdDate: Date;
  modifiedDate: Date;
  description: string;
  discussions: [{ [key: string]: boolean }];
}