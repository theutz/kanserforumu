import { Observable } from 'rxjs/Rx';
import { Discussions } from './discussion';
import { FirebaseListObservable } from 'angularfire2/database';

export interface Forum {
  key: string | null;
  title: string;
  createdDate: string;
  modifiedDate: string;
  description: string;
  discussionKeys: [{ [key: string]: boolean }];
}