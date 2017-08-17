import { AppComponent } from '../app.component';
import { AppBuy } from '../app.buymenu';
import { AppSell } from '../app.sellmenu';
import { AppLogin } from '../app.login';
import { AppPayment } from '../app.payment';
import { AppBuydetail } from '../app.buydetail';
import { AppRegister } from '../app.register';

import { CanActivateAuthGuard } from '../services/app.canActivateGaurd';

export const RouteDefinitions: [object] = [
        {path: '', component: AppLogin},
        {path: 'register', component: AppRegister},
        {path: 'home', component: AppComponent, canActivate: [
        CanActivateAuthGuard
        ]},
        {path: 'get', component: AppBuy, canActivate: [
        CanActivateAuthGuard
        ]},
        {path: 'get/:id', component: AppBuydetail, canActivate: [
        CanActivateAuthGuard
        ]},
        {path: 'sell', component: AppSell, canActivate: [
        CanActivateAuthGuard
        ]},
        {path: 'pay', component: AppPayment, canActivate: [
        CanActivateAuthGuard
        ]}
    ];