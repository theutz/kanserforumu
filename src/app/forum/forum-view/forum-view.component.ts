import { ForumService } from '../../services/forum.service';
import { Observable } from 'rxjs/Rx';
import { Forum } from '../../services/forum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.scss']
})
export class ForumViewComponent implements OnInit {
  forum: Forum;

  constructor(
    private _route: ActivatedRoute,
    private _forumService: ForumService
  ) { }

  ngOnInit() {
    // this._route.paramMap.subscribe(x => console.log(x));
    this._loadForum();
  }

  private _loadForum() {
    this._route.paramMap
      .subscribe(map => {
        this._forumService.get(map.get('id'))
          .subscribe(forum => this.forum = forum);
      });
  }

}
