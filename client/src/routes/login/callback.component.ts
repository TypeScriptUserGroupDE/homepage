import {Component, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, Response, RequestOptions} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouteParams} from '@angular/router-deprecated';
import {Observable}     from 'rxjs/Observable';

@Component({
    selector: 'callback',
    template: '',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class CallbackComponent implements OnInit {

    constructor(private routeParams:RouteParams,
                private http:Http,
                private router:Router) {
    }

    ngOnInit() {
        console.log(this.routeParams.get('code'));
        let code = this.routeParams.get('code');
        let body = JSON.stringify({code});

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.http.post(
            '/api/login',
            body,
            options)
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                    localStorage.setItem('token', data.token);
                    if (data.user.active === false) {
                        this.router.navigate(['UserAdd']);
                    } else {
                        this.router.navigate(['List']);
                    }
                },
                error => console.log(error),
                () => console.log('Login successful')
            );
    }

}