import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {User} from '../../components/User';
import {SearchPipe} from "../../services/SearchPipe";
import {TecPipe} from "../../services/TecPipe";

@Component({
    selector: 'list',
    templateUrl: './routes/list/list.html',
    pipes: [SearchPipe, TecPipe],
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
    providers: []
})

export class ListComponent implements OnInit {
    @Input() search: string = "";
    users: User[];
    paginatedUsers: User[];
    filteredUsers: User[];
    text: string;
    count: number;
    itemsPerPage: number = 9;
    pages: number[];
    pageIndex: number = 0;
    skip: number = 0;
    isSearchDone: boolean = false;
    city: string;
    tec: string;

    constructor(public router: Router,
                public http: Http) {

    }

    ngOnInit() {
        this.isSearchDone = false;

        this.http.get('/api/user/get/all')
            .map(res => res.json())
            .subscribe(
                data => {
                    this.users = data;
                    this.paginate();
                },
                error => console.log(error)
            );
    }

    paginate(search?: string) {
        search = search || "";
        this.filteredUsers = new SearchPipe().transform(this.users, search);
        this.count = this.filteredUsers.length;
        this.pages = Array(Math.ceil(this.count / this.itemsPerPage));
        this.paginatedUsers = this.filteredUsers.slice(0, this.itemsPerPage);
    }

    loadPage(index: number) {
        this.pageIndex = index;
        console.log(this.skip);
        this.skip = this.pageIndex * this.itemsPerPage;
        this.paginatedUsers = this.filteredUsers.slice(this.skip + 0, this.skip + this.itemsPerPage)
    };

    inValidateSearch() {
        this.search = "";
        this.paginate();
    }

    onClick(username: string) {
        this.router.navigate(['/developer', username]);
    }

}