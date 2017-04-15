import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { MomentModule } from 'angular2-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MainContentComponent } from './main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AppRoutingModule,
    CollapseModule,
    MomentModule,
    ToastrModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    MainContentComponent,
  ],
  exports: [
    NavbarComponent,
    TranslateModule,
    FooterComponent,
    MomentModule,
    ToastrModule,
    BrowserAnimationsModule,
    MainContentComponent
  ]
})
export class SharedModule { }
