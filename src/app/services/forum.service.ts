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

  add(forum: Forum) {
    const key = this._db.list(this._baseNode)
      .push(null).ref.key;
    forum.key = key;
    this.set(forum);
  }

  set(forum: Forum) {
    this._db.object(this._forumNode(forum.key))
      .set(forum);
  }

  update(forum: Forum) {

  }

  remove(forumKey: string) {

  }

  // Address Utils
  private _forumNode(forumKey: string) {
    return `${this._baseNode}/${forumKey}`;
  }

  private _discussionsNode(forumKey: string) {
    return `${this._baseNode}/${forumKey}/discussions`;
  }
}
