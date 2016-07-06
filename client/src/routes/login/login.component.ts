import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {AppConfig} from './../../config/config';

@Component({
    selector: 'login',
    templateUrl: './routes/login/login.html',
    providers: []
})

export class LoginComponent implements OnInit {

    constructor(public http:Http,
                public authHttp:AuthHttp) {
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