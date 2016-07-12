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
    providers: []
})

export class ListComponent implements OnInit {
    users:User[];
    text:string;

    constructor(private router:Router,
                public http:Http,
                public authHttp:AuthHttp) {
    }

    ngOnInit() {
        this.http.get('/api/user/get/all')
            .map(res => res.json())
            .subscribe(
                data => this.users = data,
                error => console.log(error)
            );
    }

    onClick(username:string) {
        this.router.navigate(['/single', username]);
    }
}

interface marker {
    lat:number;
    lng:number;
    label?:string;
}