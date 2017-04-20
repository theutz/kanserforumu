import { IsAdminOrModeratorGuard } from './is-admin-or-moderator.guard';
import { DiscussionComponent } from './forum/discussion/discussion.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ForumComponent } from './forum/forum/forum.component';
import { ForumListComponent } from './forum/forum-list/forum-list.component';
import { ForumViewComponent } from './forum/forum-view/forum-view.component';
import { ForumEditComponent } from './forum/forum-edit/forum-edit.component';
import { ForumResolver } from './services/forum-resolver.service';
import { DiscussionViewComponent } from './forum/discussion-view/discussion-view.component';
import { DiscussionEditComponent } from './forum/discussion-edit/discussion-edit.component';
import { DiscussionResolver } from './services/discussion-resolver.service';
import { Observable } from 'rxjs/Rx';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'forum', component: ForumComponent, children: [
          { path: ':id', component: ForumViewComponent, resolve: ForumResolver },
          { path: ':id/edit', component: ForumEditComponent, resolve: ForumResolver },
          { path: '', component: ForumListComponent },
        ]
      },
      {
        path: 'discussion', component: DiscussionComponent, children: [
          { path: ':id', component: DiscussionViewComponent, resolve: DiscussionResolver },
          {
            path: ':id/edit',
            component: DiscussionEditComponent,
            resolve: DiscussionResolver,
            canActivate: [AuthGuard, IsAdminOrModeratorGuard],
          },
          { path: '', redirectTo: '/forum', pathMatch: 'full' }
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ])
  ],
  providers: [
    AuthGuard,
    IsAdminOrModeratorGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
