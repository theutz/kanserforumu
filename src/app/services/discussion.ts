export type Discussions = Discussion[];
export interface Discussion {
  key: string | null;
  title: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  forumKey: string;
}
