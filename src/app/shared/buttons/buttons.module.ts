import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { RemoveButtonComponent } from './remove-button/remove-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

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
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  exports: [
    AddButtonComponent,
    EditButtonComponent,
    RemoveButtonComponent,
    BackButtonComponent,
    SaveButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent
  ]
})
export class ButtonsModule { }
