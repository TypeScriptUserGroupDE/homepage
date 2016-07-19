import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
    selector: 'list',
    templateUrl: './routes/home/home.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    precompile: []
})

export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }

}

