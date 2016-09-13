import {Component, OnInit} from '@angular/core';
import {AppConfig} from './../../config/app.config';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  login() {
    var client_id = AppConfig.github_client_id;
    var scope = "user:email";
    var url = "https://github.com/login/oauth/authorize?client_id=" + client_id + "&scope=" + scope;
    window.location.replace(url);
  };
}
