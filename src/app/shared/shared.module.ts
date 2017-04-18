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
import { MainContentModule } from './main-content/main-content.module';
import { ButtonsModule } from './buttons/buttons.module';
import { LoaderComponent } from './loader/loader.component';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AppRoutingModule,
    CollapseModule,
    MomentModule,
    ToastrModule,
    BrowserAnimationsModule,
    MainContentModule,
    ButtonsModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    TinyEditorComponent,
  ],
  exports: [
    NavbarComponent,
    TranslateModule,
    FooterComponent,
    MomentModule,
    ToastrModule,
    BrowserAnimationsModule,
    MainContentModule,
    ButtonsModule,
    LoaderComponent,
    TinyEditorComponent
  ]
})
export class SharedModule { }
