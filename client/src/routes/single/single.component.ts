import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {RouteParams} from '@angular/router-deprecated';
import {AuthHttp} from 'angular2-jwt';

@Component({
    selector: 'single',
    templateUrl: './routes/single/single.html'
})

export class SingleComponent implements OnInit {

    constructor(public http:Http,
                public authHttp:AuthHttp,
                private routeParams:RouteParams) {
    }

    user = {};
    body = {};

    ngOnInit() {
        // var body;
        this.body.id = this.routeParams.get('userid');

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.authHttp.post('/api/user/get',
            this.body,
            options)
            .map(res => res.json())
            .subscribe(
                data => this.user = data,
                error => console.log(error)
            );
    }
}