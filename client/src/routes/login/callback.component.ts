import {Component, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, Response, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'callback',
    templateUrl: './routes/login/callback.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS],
})

export class CallbackComponent implements OnInit {
    code:string;

    constructor(private route:ActivatedRoute,
                private http:Http,
                private router:Router) {
    }

    ngOnInit() {
        this.router
            .routerState
            .queryParams
            .subscribe(
                params => this.code = params['code']
            );

        let body = JSON.stringify({code: this.code});

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
                        this.router.navigateByUrl('/user/add');
                    } else {
                        this.router.navigateByUrl('/directory');
                    }
                },
                error => console.log(error),
                () => console.log('Login successful')
            );
    }

}