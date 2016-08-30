import {NgModule, provide}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}          from '@angular/forms';
import {routing} from './app.routes';

import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {ImprintComponent} from './routes/imprint/imprint.component';
import {HeaderComponent} from './routes/header/header.component';
import {NavigationComponent} from './routes/navigation/navigation.component';
import {LoginComponent} from './routes/login/login.component';
import {SingleComponent} from './routes/single/single.component';
import {ListComponent} from './routes/list/list.component';
import {MapComponent} from './routes/map/map.component';
import {CallbackComponent} from './routes/login/callback.component';
import {UserAddComponent} from './routes/user/add/userAdd.component';
import {UserMessageComponent} from './routes/user/message/userMessage.component';

import {AuthService} from './services/AuthService';
import {DataService} from './services/DataService';
import {SingleUserResolver} from './components/resolver';
import {UserAddResolver} from './components/resolver';

import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule} from '@angular/http';
import {provideLazyMapsAPILoaderConfig, AgmCoreModule} from 'angular2-google-maps/core';
import {AppConfig} from './config/config';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        AgmCoreModule.forRoot(),
        HttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ImprintComponent,
        MapComponent,
        HeaderComponent,
        NavigationComponent,
        LoginComponent,
        SingleComponent,
        ListComponent,
        CallbackComponent,
        UserAddComponent,
        UserMessageComponent],
    providers: [
        provideLazyMapsAPILoaderConfig({apiKey: AppConfig.google_maps_api_key}),
        AuthService,
        DataService,
        SingleUserResolver,
        UserAddResolver,
        provide(AuthHttp, {
            useFactory: (http: Http) => {
                return new AuthHttp(new AuthConfig({
                    headerName: 'x-access-token',
                    headerPrefix: '',
                    noTokenScheme: true,
                    tokenName: 'token'
                }), http);
            },
            deps: [Http]
        })
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}