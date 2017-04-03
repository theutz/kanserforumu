import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ForumService } from './forum.service';
import { Forum } from './forum';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ForumResolver implements Resolve<Forum> {

  constructor(
    private _forumService: ForumService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Forum> {
    return this._forumService.get(route.paramMap.get('id'));
  }
}