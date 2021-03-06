import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Router, CanActivate} from '@angular/router';
import {AppConfig} from './../../config/app.config';

@Injectable()

export class AuthService implements CanActivate {

  constructor(public http: Http,
              public router: Router,
              private jwtHelper: JwtHelper) {
  }

  canActivate() {
    return this.isLoggedIn();
  }

  getUserName(): string {
    if (window.localStorage.getItem('token')) {
      let token = window.localStorage.getItem('token');
      let decoded = this.jwtHelper.decodeToken(token);
      return decoded.login
    } else {
      return "not logged in"
    }
  }

  isLoggedIn():boolean {
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
