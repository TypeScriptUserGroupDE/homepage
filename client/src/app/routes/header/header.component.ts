import {Component, OnInit} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, AuthService]
})

export class HeaderComponent {

  constructor(public http: Http,
              public authHttp: AuthHttp,
              public router: Router,
              private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.login();
  };

  getCurrentRoute() {
    return this.authService.getCurrentRoute();
  }
}
