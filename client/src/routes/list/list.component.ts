import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {User} from '../../components/User';

@Component({
    selector: 'list',
    templateUrl: './routes/list/list.html',
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
    providers: [],
    precompile: []
})

export class ListComponent implements OnInit {
    users:User[];
    text:string;
    count:number;
    pages:number;
    pageIndex:number = 0;
    skip:number = 0;

    constructor(public router:Router,
                public http:Http,
                public authHttp:AuthHttp) {
    }

    ngOnInit() {
        this.http.get('/api/user/get/count')
            .map(res => res.json())
            .subscribe(
                data => {
                    this.count = data;
                    this.pages = Array(Math.ceil(this.count / 10))
                },
                error => console.log(error)
            );

        this.http.post('/api/user/get/all',
            {skip: this.skip})
            .map(res => res.json())
            .subscribe(
                data => this.users = data,
                error => console.log(error)
            );
    }

    onClick(username:string) {
        this.router.navigate(['/developer', username]);
    }

    loadPage(index:number) {
        this.pageIndex = index;
        this.skip = this.pageIndex * 10;
        this.http.post('/api/user/get/all',
            {skip: this.skip})
            .map(res => res.json())
            .subscribe(
                data => this.users = data,
                error => console.log(error)
            );
    }
}

interface marker {
    lat:number;
    lng:number;
    label?:string;
}