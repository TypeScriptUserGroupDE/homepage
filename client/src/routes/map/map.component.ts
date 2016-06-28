import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthHttp} from 'angular2-jwt';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
    selector: 'map',
    templateUrl: './routes/map/map.html',
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
    providers: []
})

export class MapComponent implements OnInit {

    markers = [];

    constructor(private router:Router,
                public http:Http,
                public authHttp:AuthHttp) {
        console.log('MapCtrl');
    }

    ngOnInit() {
        this.http.get('/api/user/get/map')
            .map(res => res.json())
            .subscribe(
                data => {
                    this.markers = data;
                    console.log(this.markers);
                },
                error => console.log(error)
            );
    }


    //config map zoom level and inital center corrdinates
    zoom:number = 7;
    lat:number = 51.165691;
    lng:number = 10.451526;

    onClick(id) {
        this.router.navigate(['Single', {userid: id}]);
    }
}

interface marker {
    lat:number;
    lng:number;
    label?:string;
}