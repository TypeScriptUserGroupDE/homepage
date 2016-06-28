import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthHttp} from 'angular2-jwt';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
    selector: 'list',
    templateUrl: './routes/list/list.html',
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
    providers: []
})

export class ListComponent implements OnInit {

    constructor(private router:Router,
                public http:Http,
                public authHttp:AuthHttp) {
    }

    users = [];

    ngOnInit() {
        this.http.get('/api/user/get/all')
            .map(res => res.json())
            .subscribe(
                data => this.users = data,
                error => console.log(error)
            );
    }

    onClick(id) {
        this.router.navigate(['Single', {userid: id}]);
    }
}

interface marker {
    lat:number;
    lng:number;
    label?:string;
}