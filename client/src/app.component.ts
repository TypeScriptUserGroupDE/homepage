import {Component} from '@angular/core';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES, Event, NavigationEnd} from '@angular/router';

import {HomeComponent} from './routes/home/home.component';
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
    directives: [ROUTER_DIRECTIVES, HeaderComponent, NavigationComponent, LoginComponent, UserAddComponent],
    providers: [],
    precompile: [
        MapComponent,
        HeaderComponent,
        NavigationComponent,
        LoginComponent,
        SingleComponent,
        ListComponent,
        CallbackComponent,
        UserAddComponent,
        UserMessageComponent
    ]
})

export class AppComponent {

    constructor(public router:Router) {

        this.router.events.subscribe(
            (event:Event) => {
                if(event instanceof NavigationEnd) {
                    window.dataLayer.push({
                        event: 'pageView',
                        category: '',
                        label: '',
                        action: event.urlAfterRedirects,
                        value: ''
                    });
                    
                }
            });
    }
}
