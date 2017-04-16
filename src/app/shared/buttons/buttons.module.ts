import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    AddButtonComponent,
  ],
  exports: [
    AddButtonComponent,
  ]
})
export class ButtonsModule { }
