import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../../components/User';
import {AuthService} from '../../services/AuthService';
import {LinkyPipe} from 'angular2-linky';

@Component({
    selector: 'single',
    templateUrl: './routes/single/single.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthService],
    pipes: [LinkyPipe]
})

export class SingleComponent implements OnInit {
    sendMessageText:string;

    constructor(public http:Http,
                public authHttp:AuthHttp,
                private router:Router,
                private authService:AuthService,
                private route:ActivatedRoute) {
    }

    user = new User();
    body:{
        username?:string
    };

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.sendMessageText = "Nachricht senden";
        } else {
            this.sendMessageText = "Mit GitHub anmelden";
        }

        this.body = {};

        this.route
            .params
            .subscribe(
                params => {
                    console.log(params);
                    this.body.username = params['username'];
                }
            );
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.http.post('/api/user/get',
            JSON.stringify(this.body),
            options)
            .map(res => res.json())
            .subscribe(
                data => this.user = data,
                error => console.log(error)
            );
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    sendMessage(username:string) {
        if (this.authService.isLoggedIn()) {
        this.router.navigate(['/user/message', username]);
        } else {
            this.authService.login();
        }
    }
}