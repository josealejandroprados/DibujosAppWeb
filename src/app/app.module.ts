import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth.service';
import { CanvasService } from './shared/services/canvas.service';
import { DataService } from './shared/services/data.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    CanvasService,
    DataService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
