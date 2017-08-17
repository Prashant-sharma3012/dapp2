import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppBuy } from './app.buymenu';
import { AppSell } from './app.sellmenu';
import { AppLogin } from './app.login';
import { AppPayment } from './app.payment';
import { AppBuydetail } from './app.buydetail';
import { AppRegister } from './app.register';
import { AppInit } from './app.initial';

import {MdIconModule} from '@angular/material';

import { DataService } from './services/app.data.service';
import { CanActivateAuthGuard } from './services/app.canActivateGaurd';

import { RouteDefinitions } from './routes/app.routes';

import {MdInputModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';

import {VgCoreModule} from 'videogular2/core';

import { RouterModule} from '@angular/router';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    AppInit,
    AppBuy,
    AppSell,
    AppLogin,
    AppPayment,
    AppBuydetail,
    AppRegister
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    VgCoreModule,
    MdMenuModule,
    MdGridListModule,
    MdIconModule,
    RouterModule.forRoot(RouteDefinitions)
  ],
  providers: [DataService,CanActivateAuthGuard],
  bootstrap: [AppInit]
})
export class AppModule { }
