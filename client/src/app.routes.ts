import {provideRouter, RouterConfig} from '@angular/router';
import {AuthService} from './services/AuthService';
import {LoginComponent} from './routes/login/login.component';
import {SingleComponent} from './routes/single/single.component';
import {ListComponent} from './routes/list/list.component';
import {MapComponent} from './routes/map/map.component';
import {HomeComponent} from './routes/home/home.component';
import {CallbackComponent} from './routes/login/callback.component';
import {UserAddComponent} from './routes/user/add/userAdd.component';
import {UserMessageComponent} from './routes/user/message/userMessage.component';

export const routes:RouterConfig = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'map', component: MapComponent},
    {path: 'directory', component: ListComponent},
    {path: 'developer/:username', component: SingleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user/add', component: UserAddComponent, canActivate: [AuthService]},
    {path: 'user/message/:username', component: UserMessageComponent, canActivate: [AuthService]},
    {path: 'accessToken', component: CallbackComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthService
];

// export const AUTH_PROVIDERS = [];