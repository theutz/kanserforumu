import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { MomentModule } from 'angular2-moment';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AppRoutingModule,
    CollapseModule,
    MomentModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    NavbarComponent,
    TranslateModule,
    FooterComponent,
    MomentModule,
    ToastModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
