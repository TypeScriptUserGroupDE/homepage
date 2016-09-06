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
import {SingleUserResolver} from './services/resolver/resolver.service';
import {UserAddResolver} from './services/resolver/resolver.service';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'impressum', component: ImprintComponent},
  {path: 'map', component: MapComponent},
  {path: 'directory', component: ListComponent},
  {path: 'developer/:username', component: SingleComponent, resolve: {user: SingleUserResolver}},
  {path: 'login', component: LoginComponent},
  {path: 'user/add', component: UserAddComponent, canActivate: [AuthService], resolve: {user: UserAddResolver}},
  {path: 'user/message/:username', component: UserMessageComponent, canActivate: [AuthService], resolve: {user: SingleUserResolver}},
  {path: 'accessToken', component: CallbackComponent}
];

export const routing = RouterModule.forRoot(routes);