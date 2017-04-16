import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AddButtonComponent,
  ],
  exports: [
    AddButtonComponent
  ]
})
export class ButtonsModule { }
