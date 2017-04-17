import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { RemoveButtonComponent } from './remove-button/remove-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    AddButtonComponent,
    EditButtonComponent,
    RemoveButtonComponent,
    BackButtonComponent,
    SaveButtonComponent,
  ],
  exports: [
    AddButtonComponent,
    EditButtonComponent,
    RemoveButtonComponent,
    BackButtonComponent,
    SaveButtonComponent
  ]
})
export class ButtonsModule { }
