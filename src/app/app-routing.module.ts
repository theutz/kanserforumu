import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum/forum.component';
import { ForumListComponent } from './forum/forum-list/forum-list.component';
import { DiscussionComponent } from './forum/discussion/discussion.component';
import { DiscussionEditComponent } from './forum/discussion-edit/discussion-edit.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'forum', component: ForumComponent, children: [
          { path: ':id', component: DiscussionComponent },
          { path: ':id/edit', component: DiscussionEditComponent },
          { path: '', component: ForumListComponent },
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
