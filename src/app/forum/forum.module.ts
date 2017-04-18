import { ForumService } from '../services/forum.service';
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
import { ForumSidebarComponent } from './forum-sidebar/forum-sidebar.component';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { TranslateModule } from '@ngx-translate/core';
import { DiscussionsService } from '../services/discussions.service';
import { DiscussionComponent } from './discussion/discussion.component';
import { DiscussionEditComponent } from './discussion-edit/discussion-edit.component'
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum';
import { ForumEditComponent } from './forum-edit/forum-edit.component';
import { ForumViewComponent } from './forum-view/forum-view.component';
import { DiscussionViewComponent } from './discussion-view/discussion-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule,
    TranslateModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    ForumListComponent,
    ForumComponent,
    ForumWelcomeComponent,
    ForumNavbarComponent,
    ForumCategoriesComponent,
    ForumInfoComponent,
    ForumSidebarComponent,
    DiscussionComponent,
    DiscussionEditComponent,
    ForumEditComponent,
    ForumViewComponent,
    DiscussionViewComponent,
  ],
  providers: [
    DiscussionsService,
    ForumService,
  ]
})
export class ForumModule { }
