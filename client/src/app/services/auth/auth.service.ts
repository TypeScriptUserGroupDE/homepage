import {Injectable} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Router, CanActivate} from '@angular/router';
import {AppConfig} from './../../config/app.config';

@Injectable()

export class AuthService implements CanActivate {

  constructor(public http: Http,
              public router: Router) {

  }

  canActivate() {
    if (this.isLoggedIn() === true) {
      return true;
    } else {
      return false
    }
  }

  isLoggedIn() {
    if (window.localStorage.getItem('token')) {
      if (tokenNotExpired('token') === true) {
        return true
      } else {
        window.localStorage.removeItem('token');
        return false
      }
    } else {
      return false
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  // redirect to github OAuth
  login() {
    var client_id = AppConfig.github_client_id;
    var scope = "user:email";
    var url = "https://github.com/login/oauth/authorize?client_id=" + client_id + "&scope=" + scope;
    window.location.replace(url);
  };

  getCurrentRoute() {
    return this.router.url
  }
}
