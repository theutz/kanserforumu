import * as moment from 'moment';
import { AppMissingTranslationHandler } from './app-missing-translation-handler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler } from '@ngx-translate/core';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { ForumModule } from './forum/forum.module';
import { AngularFireModule } from 'angularfire2';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    ForumModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCQEZubfgXV-Als42XLneLT-DjS48ES4Ls',
      authDomain: 'kanserforumu.firebaseapp.com',
      databaseURL: 'https://kanserforumu.firebaseio.com',
      storageBucket: 'kanserforumu.appspot.com',
      messagingSenderId: '839522952482'
    }),
    CarouselModule.forRoot(),
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: AppMissingTranslationHandler
      },
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

moment.locale('tr-tr');