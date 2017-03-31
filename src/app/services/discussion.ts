export interface Discussion {
  id: string;
  title: string;
  body?: string | string[];
  summary?: string;
  createdDate: Date;
  modifiedDate: Date;
}
