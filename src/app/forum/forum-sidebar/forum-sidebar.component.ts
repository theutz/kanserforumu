import { Location } from '@angular/common';
import { ForumService } from '../../services/forum.service';
import { Forum } from '../../services/forum';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-forum-sidebar',
  templateUrl: './forum-sidebar.component.html',
  styleUrls: ['./forum-sidebar.component.scss']
})
export class ForumSidebarComponent implements OnInit {

  private _unsubscriber: Subject<void> = new Subject<void>();
  private _destroy$: Observable<void> = this._unsubscriber.asObservable();

  constructor(
  ) { }

  ngOnInit() {
  }

}
