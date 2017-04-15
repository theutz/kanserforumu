import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddComponent, AddButtonComponent]
})
export class ButtonsModule { }
