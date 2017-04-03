import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Forums, Forum } from './forum';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ForumService {
  private _list: FirebaseListObservable<Forums>;

  constructor(
    private _af: AngularFire
  ) {
    this._list = this._af.database.list('/forums');
  }

  getAll(): FirebaseListObservable<Forums> {
    return this._list;
  }

  create(forum: Forum): Observable<any> {
    const sub = new ReplaySubject<any>();

    if (forum.createdDate instanceof Date) {
      forum.createdDate.toISOString();
    }
    if (forum.modifiedDate instanceof Date) {
      forum.modifiedDate.toISOString();
    }

    this._list.push(forum)
      .then(x => {
        sub.next(x);
        sub.complete();
      });

    return sub.asObservable();
  }
}
