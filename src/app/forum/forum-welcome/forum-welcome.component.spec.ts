import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumWelcomeComponent } from './forum-welcome.component';

describe('ForumWelcomeComponent', () => {
  let component: ForumWelcomeComponent;
  let fixture: ComponentFixture<ForumWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
