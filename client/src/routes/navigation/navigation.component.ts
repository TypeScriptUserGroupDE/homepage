import {Component, OnInit} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AuthService} from '../../services/AuthService';

@Component({
    selector: 'navigation',
    templateUrl: './routes/navigation/navigation.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, AuthService]
})

export class NavigationComponent {

    constructor(public http:Http,
                public authHttp:AuthHttp,
                public router:Router,
                public authService:AuthService) {

    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }

    login() {
        this.authService.login();
    };
}