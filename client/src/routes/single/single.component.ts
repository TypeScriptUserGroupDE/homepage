import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {RouteParams, Router} from '@angular/router-deprecated';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../../components/User';
import {AuthService} from '../../services/AuthService';

@Component({
    selector: 'single',
    templateUrl: './routes/single/single.html',
    providers: [AuthService]
})

export class SingleComponent implements OnInit {
    sendMessageText:string;

    constructor(public http:Http,
                public authHttp:AuthHttp,
                private routeParams:RouteParams,
                private router:Router,
                private authService:AuthService) {
    }

    user = new User();
    body:{
        id?:string
    };

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.sendMessageText = "Nachricht senden";
        } else {
            this.sendMessageText = "Bitte anmelden";
        }

        this.body = {};
        this.body.id = this.routeParams.get('userid');

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.authHttp.post('/api/user/get',
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

    sendMessage(id:string) {
        // if (this.authService.isLoggedIn()) {
            this.router.navigate(['UserMessage', {userid: id}]);
        // } else {
        //     console.log('nope');
        // }
    }
}