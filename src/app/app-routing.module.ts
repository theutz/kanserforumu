import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}