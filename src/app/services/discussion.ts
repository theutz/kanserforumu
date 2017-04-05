export type Discussions = Discussion[];
export interface Discussion {
  key: string;
  title: string;
  description?: string;
  createdDate: Date | string;
  modifiedDate?: Date | string;
  forumKey: string;
}
