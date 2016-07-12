import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
// import {ProtectedRouterOutlet} from './components/ProtectedRouterOutlet';

import {HeaderComponent} from './routes/header/header.component';
import {NavigationComponent} from './routes/navigation/navigation.component';
import {LoginComponent} from './routes/login/login.component';
import {SingleComponent} from './routes/single/single.component';
import {ListComponent} from './routes/list/list.component';
import {MapComponent} from './routes/map/map.component';
import {CallbackComponent} from './routes/login/callback.component';
import {UserAddComponent} from './routes/user/add/userAdd.component';
import {UserMessageComponent} from './routes/user/message/userMessage.component';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent, NavigationComponent, LoginComponent],
    providers: []
})

export class AppComponent {
}
