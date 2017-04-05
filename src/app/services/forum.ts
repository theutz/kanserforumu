import { Discussions } from './discussion';
import { FirebaseListObservable } from 'angularfire2/database';
export type Forums = Forum[];

export interface Forum {
  key: string;
  title: string;
  createdDate: Date | string;
  modifiedDate?: Date | string;
  description?: string;
  discussions?: [{ [key: string]: boolean }] | FirebaseListObservable<Discussions> | Discussions;
}