import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app.routing.module.";
import {authInterceptorProviders} from "./interceptors/auth.interceptor";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {responseInterceptorProviders} from "./interceptors/response.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [authInterceptorProviders, responseInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
