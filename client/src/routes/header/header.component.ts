import {Component, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {ROUTER_DIRECTIVES, CanActivate} from '@angular/router-deprecated';

@Component({
    selector: 'header',
    templateUrl: './routes/header/header.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

// @CanActivate(() => tokenNotExpired())

export class HeaderComponent implements OnInit {

    constructor(public http:Http,
                public authHttp:AuthHttp) {

    }

    loggedIn() {
        return tokenNotExpired('token')
    }


    ngOnInit() {
    }
}