import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Discussion } from '../services/discussion';

@Injectable()
export class DiscussionsService {

  constructor(
    private _af: AngularFire
  ) { }

  getAll(): FirebaseListObservable<Discussion[]> {
    return this._af.database.list('/discussions');
  }

}
