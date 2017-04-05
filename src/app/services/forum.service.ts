import { DiscussionsService } from './discussions.service';
import { Discussions, Discussion } from './discussion';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Forums, Forum } from './forum';
import { AngularFire, AngularFireDatabase } from 'angularfire2';

@Injectable()
export class ForumService {
  private _db: AngularFireDatabase;
  private _baseUrl = '/forums';
  private _itemUrl = (forumKey: string) => `${this._baseUrl}/${forumKey}`;
  private _discussionUrl = (forumKey: string) => `${this._itemUrl(forumKey)}/discussions`;

  constructor(
    private _af: AngularFire,
    private _discussionService: DiscussionsService
  ) {
    this._db = _af.database;
  }

  getAll(): Observable<Forums> {
    return this._db.list('/forums');
  }

  get(forumKey: string): Observable<Forum> {
    return this._db.object(this._itemUrl(forumKey))
      .switchMap(forum => {
        return Observable.of(forum);
      })
  }

  create(forum: Forum): Observable<any> {
    const sub = new ReplaySubject<any>();

    forum.createdDate = this._dateToString(forum.createdDate);
    forum.modifiedDate = this._dateToString(forum.modifiedDate);

    this._db.list(this._baseUrl).push(forum)
      .then(x => {
        sub.next(x);
        sub.complete();
      });

    return sub.asObservable();
  }

  private _dateToString(date: string | Date): string {
    if (date instanceof Date) {
      return date.toISOString();
    } else {
      return date;
    }
  }
}
