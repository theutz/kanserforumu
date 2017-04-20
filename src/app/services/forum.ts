import { Observable } from 'rxjs/Rx';
import { FirebaseListObservable } from 'angularfire2/database';

export interface Forum {
  key: string | null;
  title: string;
  createdDate: string;
  modifiedDate: string;
  description: string;
}
