import {provideRouter, RouterConfig} from '@angular/router';
import {AuthService} from './services/AuthService';
import {LoginComponent} from './routes/login/login.component';
import {SingleComponent} from './routes/single/single.component';
import {ListComponent} from './routes/list/list.component';
import {MapComponent} from './routes/map/map.component';
import {CallbackComponent} from './routes/login/callback.component';
import {UserAddComponent} from './routes/user/add/userAdd.component';
import {UserMessageComponent} from './routes/user/message/userMessage.component';

export const routes:RouterConfig = [
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: 'map', component: MapComponent},
    {path: 'list', component: ListComponent},
    {path: 'single/:username', component: SingleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user/add', name: 'UserAdd', component: UserAddComponent, canActivate: [AuthService]},
    {path: 'user/message/:username', name: 'UserMessage', component: UserMessageComponent, canActivate: [AuthService]},
    {path: 'accessToken', name: 'Callback', component: CallbackComponent}


    // { path: 'crisis-center', component: CrisisCenterComponent },
    // { path: 'heroes', component: HeroListComponent },
    // { path: 'hero/:id', component: HeroDetailComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthService
];

export const AUTH_PROVIDERS = [];


// @RouteConfig([
//     {path: '/', redirectTo: ['/List']},
//     {path: '/single/:userid', name: 'Single', component: SingleComponent},
//     {path: '/list', name: 'List', component: ListComponent},
//     {path: '/login', name: 'Login', component: LoginComponent},
//     {path: '/map', name: 'Map', component: MapComponent},
//     {path: '/user/add', name: 'UserAdd', component: UserAddComponent},
//     {path: '/user/message/:userid', name: 'UserMessage', component: UserMessageComponent},
//     {path: '/accessToken', name: 'Callback', component: CallbackComponent}
// ])