///<reference path="../typings/index.d.ts"/>

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {provide} from "@angular/core";
import {AppComponent} from './app.component';
import {enableProdMode} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FORM_PROVIDERS} from '@angular/common';
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

//needed for http.XXX.map()
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


enableProdMode();

bootstrap(AppComponent, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'x-access-token',
                headerPrefix: '',
                noTokenScheme: true,
                tokenName: 'token'
            }), http);
        },
        deps: [Http]
    })
]);