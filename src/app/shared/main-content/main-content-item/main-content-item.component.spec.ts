import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentItemComponent } from './main-content-item.component';

describe('MainContentItemComponent', () => {
  let component: MainContentItemComponent;
  let fixture: ComponentFixture<MainContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
