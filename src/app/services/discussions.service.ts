import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { Discussion, Discussions } from '../services/discussion';

@Injectable()
export class DiscussionsService {
  private _baseUrl = '/discussions';
  private _db: AngularFireDatabase;
  private _itemUrl = (key: string) => `${this._baseUrl}/${key}`;

  constructor(
    private _af: AngularFire
  ) {
    this._db = _af.database;
  }

  getAll(): Observable<Discussions> {
    return this._db.list(this._baseUrl);
  }

  get(key: string): Observable<Discussions> {
    return this._db.object(this._itemUrl(key));
  }

  create(discussion: Discussion): Observable<string> {
    const sub = new ReplaySubject<string>();

    discussion.createdDate = this._dateAsString(discussion.createdDate);
    discussion.modifiedDate = this._dateAsString(discussion.modifiedDate);

    this._db.list(this._baseUrl)
      .push(discussion)
      .then(ref => { sub.next(ref.key); sub.complete(); });

    return sub.asObservable();
  }

  private _dateAsString: (date: string | Date) => string = (date) => date instanceof Date ? date.toISOString() : date;
}
