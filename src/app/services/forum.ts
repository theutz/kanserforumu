import { Observable } from 'rxjs/Rx';
import { Discussions } from './discussion';
import { FirebaseListObservable } from 'angularfire2/database';
export type Forums = Forum[];

export interface Forum {
  key: string | null;
  title: string;
  createdDate: string;
  modifiedDate: string;
  description: string;
  discussions: [{ [key: string]: boolean }] | Observable<Discussions> | Discussions;
}