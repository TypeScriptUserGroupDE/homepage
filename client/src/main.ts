///<reference path="../typings/index.d.ts"/>
import {bootstrap}    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {provide} from "@angular/core";
import {AppComponent} from './app.component';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {enableProdMode} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FORM_PROVIDERS} from '@angular/common';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core';
import {AppConfig} from './config/config';

//needed for http.XXX.map()
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


enableProdMode();

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({ apiKey: AppConfig.google_maps_api_key}),
        provide(AuthHttp, {
        useFactory: (http:Http) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'x-access-token',
                headerPrefix: '',
                noTokenScheme: true,
                tokenName: 'token'
            }), http);
        },
        deps: [Http]
    })
])
    .catch(err => console.error(err));