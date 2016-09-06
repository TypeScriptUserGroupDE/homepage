import {Component, OnInit} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [ROUTER_DIRECTIVES],
  providers: []
})

export class HomeComponent implements OnInit {

  constructor(public http:Http,
              public authHttp:AuthHttp,
              public router:Router,
              public authService:AuthService) {
  }

  ngOnInit() {

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

