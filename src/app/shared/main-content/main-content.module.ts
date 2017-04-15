import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';
import { MainContentItemComponent } from './main-content-item/main-content-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainContentComponent,
    MainContentItemComponent
  ],
  exports: [
    MainContentComponent
  ]
})
export class MainContentModule { }