import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    TranslateModule
  ]
})
export class SharedModule { }
