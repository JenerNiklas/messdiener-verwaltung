import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { MessdienerListeComponent } from './messdiener-liste/messdiener-liste.component';
import { MessdienerDetailComponent } from './messdiener-detail/messdiener-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MessagesComponent } from './messages/messages.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MessdienerListeComponent,
    MessdienerDetailComponent,
    NavigationComponent,
    MessagesComponent,
    ErrorPageComponent,
    StartpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
