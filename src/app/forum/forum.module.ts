import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumComponent } from './forum/forum.component';
import { RouterModule } from '@angular/router';
import { ForumWelcomeComponent } from './forum-welcome/forum-welcome.component';
import { ForumNavbarComponent } from './forum-navbar/forum-navbar.component';
import { ForumCategoriesComponent } from './forum-categories/forum-categories.component';
import { ForumInfoComponent } from './forum-info/forum-info.component';
import { DiscussionsListComponent } from './discussions-list/discussions-list.component';
import { ForumSidebarComponent } from './forum-sidebar/forum-sidebar.component';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { TranslateModule } from '@ngx-translate/core';
import { DiscussionsService } from '../services/discussions.service';
import { DiscussionComponent } from './discussion/discussion.component';
import { DiscussionEditComponent } from './discussion-edit/discussion-edit.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [
    ForumListComponent,
    ForumComponent,
    ForumWelcomeComponent,
    ForumNavbarComponent,
    ForumCategoriesComponent,
    ForumInfoComponent,
    DiscussionsListComponent,
    ForumSidebarComponent,
    DiscussionComponent,
    DiscussionEditComponent,
  ],
  providers: [
    DiscussionsService,
  ]
})
export class ForumModule { }
