import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppBuy } from './app.buymenu';
import { AppSell } from './app.sellmenu';
import { AppLogin } from './app.login';
import { AppPayment } from './app.payment';
import { AppBuydetail } from './app.buydetail';

import { DataService } from './services/app.data.service';

import {MdInputModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';

import { RouterModule} from '@angular/router';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    AppBuy,
    AppSell,
    AppLogin,
    AppPayment,
    AppBuydetail
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdGridListModule,
    RouterModule.forRoot([
        {path: '', component: AppLogin},
        {path: 'user', component: AppComponent},
        {path: 'buy', component: AppBuy},
        {path: 'buy/:id', component: AppBuy},
        {path: 'sell', component: AppSell},
        {path: 'pay', component: AppPayment},
    ])
  ],
  providers: [DataService],
  bootstrap: [AppLogin]
})
export class AppModule { }
