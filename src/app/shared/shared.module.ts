import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AppRoutingModule,
    CollapseModule,
    MomentModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    NavbarComponent,
    TranslateModule,
    FooterComponent,
    MomentModule
  ]
})
export class SharedModule { }
