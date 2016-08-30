import {Component, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, Response, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {DataService} from "../../services/DataService";

@Component({
    selector: 'callback',
    templateUrl: './routes/login/callback.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS],
})

export class CallbackComponent implements OnInit {
    code: string;

    constructor(private route: ActivatedRoute,
                private http: Http,
                private router: Router,
                private dataService: DataService) {
    }

    ngOnInit() {
        this.router
            .routerState
            .queryParams
            .subscribe(
                params => this.code = params['code']
            );

        this.dataService
            .gitHubAuth(this.code)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    if (data.active === false) {
                        this.router.navigateByUrl('/user/add');
                    } else {
                        this.router.navigateByUrl('/directory');
                    }
                },
                error => console.log(error)
            );
    }

}