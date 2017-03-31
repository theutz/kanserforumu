export interface Discussion {
  id: string;
  title: string;
  description?: string;
  createdDate: Date | string;
  modifiedDate: Date | string;
}
