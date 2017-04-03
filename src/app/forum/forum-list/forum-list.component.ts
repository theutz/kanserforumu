import { Component, OnInit } from '@angular/core';
import { ForumService } from 'app/services/forum.service';
import { Forum, Forums } from 'app/services/forum';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent implements OnInit {
  forums: Forums;

  constructor(
    private _forums: ForumService
  ) { }

  ngOnInit() {
  }

}
