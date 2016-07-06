import {Injectable} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {AppConfig} from './../config/config';

@Injectable()

export class AuthService {

    constructor(public http:Http,
                public authHttp:AuthHttp,
                public router:Router) {
        
    }

    isLoggedIn() {
        if (window.localStorage.getItem('token')) {
            return tokenNotExpired('token')
        } else {
            return false
        }
    }

    logout() {
        window.localStorage.removeItem('token');
        this.router.navigate(['List']);
    }

    login() {
        var client_id = AppConfig.github_client_id;
        var scope = "user:email";
        var url = "https://github.com/login/oauth/authorize?client_id=" + client_id + "&scope=" + scope;
        window.location.replace(url);
    };
}