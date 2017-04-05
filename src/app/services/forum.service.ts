import { DiscussionsService } from './discussions.service';
import { Discussions, Discussion } from './discussion';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Forums, Forum } from './forum';
import { AngularFire, AngularFireDatabase } from 'angularfire2';

@Injectable()
export class ForumService {
  private readonly _baseNode = '/forums';

  private _db: AngularFireDatabase;

  constructor(
    private _af: AngularFire
  ) {
    this._db = _af.database;
  }

  getAll(): Observable<Forums> {
    return this._db.list(this._baseNode);
  }

  get(forumKey: string): Observable<Forum> {
    return this._db.object(this._forumNode(forumKey));
  }

  add(forum: Forum): Observable<string> {
    const sub = new ReplaySubject<string>();
    const key = this._db.list(this._baseNode)
      .push(null).ref.key;
    forum.key = key;
    this.set(forum)
      .take(1)
      .subscribe({
        next: f => { sub.next(key); sub.complete(); },
        error: err => sub.error(err)
      });
    return sub.asObservable();
  }

  set(forum: Forum): Observable<void> {
    const sub = new ReplaySubject<void>();
    this._db.object(this._forumNode(forum.key))
      .set(forum)
      .then(() => { sub.next(null); sub.complete(); })
      .catch(err => sub.error(err));
    return sub.asObservable();
  }

  update(forum: Forum): Observable<void> {
    const sub = new ReplaySubject<void>();
    this._db.object(this._forumNode(forum.key))
      .update(forum)
      .then(() => { sub.next(null); sub.complete(); })
      .catch(err => sub.error(err));
    return sub.asObservable();
  }

  remove(forumKey: string): Observable<void> {
    const sub = new ReplaySubject<void>();
    this._db.object(this._forumNode(forumKey))
      .remove()
      .then(() => { sub.next(null); sub.complete(); })
      .catch(err => sub.error(err));
    return sub.asObservable();
  }

  // Address Utils
  private _forumNode(forumKey: string) {
    return `${this._baseNode}/${forumKey}`;
  }

  private _discussionsNode(forumKey: string) {
    return `${this._baseNode}/${forumKey}/discussions`;
  }
}
