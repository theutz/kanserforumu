import { ForumService } from './forum.service';
import { Discussion, Discussions } from '../services/discussion';
import { Injectable } from '@angular/core';
import { AngularFire, AngularFireDatabase } from 'angularfire2';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class DiscussionsService {
  private readonly _baseNode = '/discussions';

  private _db: AngularFireDatabase;

  constructor(
    private _af: AngularFire,
    private _forumService: ForumService
  ) { this._db = _af.database; }

  getAll(): Observable<Discussions> {
    return this._db.list(this._baseNode);
  }

  get(key: string): Observable<Discussion> {
    return this._db.object(this._discussionNode(key));
  }

  add(discussion: Discussion): Observable<string> {
    const sub = new ReplaySubject<string>();

    const key = this._db.list(this._baseNode).push(null).ref.key;
    discussion.key = key;

    this.set(key, discussion).subscribe({
      next: () => {
        this._forumService
          .addDiscussion(discussion.forumKey, discussion.key)
          .subscribe({
            next: () => { sub.next(key); sub.complete(); },
            error: err => sub.error(err)
          });
      },
      error: err => sub.error(err)
    });

    return sub.asObservable();
  }

  set(key: string, discussion: Discussion): Observable<void> {
    const sub = new ReplaySubject<void>();
    this._db.object(this._discussionNode(key))
      .set(discussion)
      .then(() => { sub.next(null); sub.complete(); })
      .catch(err => sub.error(err));
    return sub.asObservable();
  }

  update(key: string, discussion: Discussion): Observable<void> {
    const sub = new ReplaySubject<void>();
    this._db.object(this._discussionNode(key))
      .update(discussion)
      .then(() => { sub.next(null); sub.complete(); })
      .catch(err => sub.error(err))
    return sub.asObservable();
  }

  remove(key: string): Observable<void> {
    const sub = new ReplaySubject<void>();
    this._db.object(this._discussionNode(key))
      .remove()
      .then(() => { sub.next(null); sub.complete(); })
      .catch(err => sub.error(err));
    return sub.asObservable()
  }

  // Address Utilities
  private _discussionNode(key: string) {
    return `${this._baseNode}/${key}`;
  }
}
