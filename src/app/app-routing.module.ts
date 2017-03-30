import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum/forum.component';
import { ForumHomeComponent } from './forum/forum-home/forum-home.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'forum', component: ForumComponent, children: [
          { path: '', component: ForumHomeComponent },
        ]
      },
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}