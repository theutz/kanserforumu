import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/router';
import { DiscussionsService } from './discussions.service';
import { Discussion } from './discussion';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class DiscussionResolver implements Resolve<Discussion> {

  constructor(
    private _discussionsService: DiscussionsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Discussion | Observable<Discussion> | Promise<Discussion> {
    return this._discussionsService.get(route.paramMap.get('discussionId'));
  }

}
