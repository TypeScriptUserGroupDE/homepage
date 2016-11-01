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
    path: '',
    component: HomeComponent,
  },
  {
    path: 'impressum',
    component: ImprintComponent
  },
  {
    path: 'karte',
    component: MapComponent,
    data: {
      meta: {
        title: 'Karte von TypeScript-Entwicklern in Deutschland, Österreich und der Schweiz',
        description: 'Unsere detaillierte Karte zeigt TypeScript-Entwickler in Deutschland, Österreich und der Schweiz',
      }
    }
  },
  {
    path: 'entwickler/profil',
    component: UserAddComponent,
    canActivate: [AuthService],
    resolve: {user: UserAddResolver}
  },
  {
    path: 'entwickler',
    component: ListComponent,
    data: {
      meta: {
        title: 'TypeScript Entwickler-Verzeichnis',
        description: 'In unserem Entwickler-Verzeichnis finden sich TypeScript-Entwickler aus Deutschland, Österreich und der Schweiz. Entwickler können kostenlos ein öffentliches Profil erstellen, um mit anderen Entwicklern in Kontakt zu treten',
      }
    }
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
  },
  {
    path: '**', redirectTo: ''
  },
];

export const routing = RouterModule.forRoot(routes);
