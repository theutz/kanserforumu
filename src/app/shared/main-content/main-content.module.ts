import { MainContentItemComponent } from './main-content-item/main-content-item.component';
import { MainContentComponent } from './main-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MainContentComponent,
    MainContentItemComponent
  ],
  exports: [
    MainContentComponent,
    MainContentItemComponent
  ]
})
export class MainContentModule { }
