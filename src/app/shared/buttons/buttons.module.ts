import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { RemoveButtonComponent } from './remove-button/remove-button.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    AddButtonComponent,
    EditButtonComponent,
    RemoveButtonComponent,
  ],
  exports: [
    AddButtonComponent,
    EditButtonComponent,
    RemoveButtonComponent
  ]
})
export class ButtonsModule { }
