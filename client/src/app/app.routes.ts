import {Routes, RouterModule} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {LoginComponent} from './routes/login/login.component';
import {SingleComponent} from './routes/single/single.component';
import {ListComponent} from './routes/list/list.component';
import {MapComponent} from './routes/map/map.component';
import {HomeComponent} from './routes/home/home.component';
import {ImprintComponent} from './routes/imprint/imprint.component';
import {CallbackComponent} from './routes/callback/callback.component';
import {UserAddComponent} from './routes/user/add/add.component';
import {UserMessageComponent} from './routes/user/message/message.component';
import {SingleUserResolver, SearchResolver, UserAddResolver} from './services/resolver/resolver.service';
import {SearchComponent} from "./routes/search/search.component";


const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '*', redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'impressum',
    component: ImprintComponent
  },
  {
    path: 'karte',
    component: MapComponent
  },
  {
    path: 'entwickler/profil',
    component: UserAddComponent,
    canActivate: [AuthService],
    resolve: {user: UserAddResolver}
  },
  {
    path: 'entwickler',
    component: ListComponent
  },
  {
    path: 'suche/:city',
    component: SearchComponent,
    resolve: {search: SearchResolver}
  },
  {
    path: 'entwickler/:username',
    component: SingleComponent,
    resolve: {user: SingleUserResolver}
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'entwickler/message/:username',
    component: UserMessageComponent,
    canActivate: [AuthService],
    resolve: {user: SingleUserResolver}
  },
  {
    path: 'accessToken',
    component: CallbackComponent
  }
];

export const routing = RouterModule.forRoot(routes);
