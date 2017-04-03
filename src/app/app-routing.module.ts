import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum/forum.component';
import { ForumListComponent } from './forum/forum-list/forum-list.component';
import { ForumViewComponent } from './forum/forum-view/forum-view.component';
import { ForumEditComponent } from './forum/forum-edit/forum-edit.component';
import { ForumResolver } from './services/forum-resolver.service';

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
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
