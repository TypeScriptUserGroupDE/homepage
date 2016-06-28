import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {ProtectedRouterOutlet} from './components/ProtectedRouterOutlet';

import {HeaderComponent} from './routes/header/header.component';
import {LoginComponent} from './routes/login/login.component';
import {SingleComponent} from './routes/single/single.component';
import {ListComponent} from './routes/list/list.component';
import {MapComponent} from './routes/map/map.component';
import {CallbackComponent} from './routes/login/callback.component';
import {UserAddComponent} from './routes/user/add/userAdd.component';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    directives: [ProtectedRouterOutlet, HeaderComponent, LoginComponent],
    providers: [
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
    {path: '/', redirectTo: ['/List']},
    {path: '/single/:userid', name: 'Single', component: SingleComponent},
    {path: '/list', name: 'List', component: ListComponent},
    {path: '/map', name: 'Map', component: MapComponent},
    {path: '/user/add', name: 'UserAdd', component: UserAddComponent},
    {path: '/accessToken', name: 'Callback', component: CallbackComponent}
])

export class AppComponent {

    constructor(private router:Router) {
        // console.log("iam here");
    }

    loadView(view) {
        this.router.navigate([view]);
    };
}