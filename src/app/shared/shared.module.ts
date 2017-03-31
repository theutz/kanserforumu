import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { FromNowPipe } from './from-now.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AppRoutingModule,
    CollapseModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    FromNowPipe
  ],
  exports: [
    NavbarComponent,
    TranslateModule,
    FooterComponent,
    FromNowPipe
  ]
})
export class SharedModule { }
