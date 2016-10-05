import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {UserListItem} from '../../components/UserListItem';
import {DataService} from './../../services/data/data.service';
import * as _ from 'lodash';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Input() search: string = "";
  data: UserListItem[];
  users: UserListItem[]; // all users
  filteredUsers: UserListItem[]; // users which match search term
  paginatedUsers: UserListItem[]; // split user array into multiple pages
  text: string;
  count: number;
  filterByTec: any;
  itemsPerPage: number = 9;
  pages: number[];
  pageIndex: number = 0;
  skip: number = 0;
  isSearchDone: boolean;
  city: string;
  typeAheadData: any;
  typeAheadDataLoaded: boolean = false;
  technologies: {} = {
    'AngularJS': 'angularjs',
    'Angular2': 'angular2',
    'Node.js': 'nodejs',
    'Ionic': 'ionic',
    'Nativescript': 'nativescript'
  };
  technologiesArray: string[];

  constructor(public router: Router,
              public http: Http,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.technologiesArray = Object.keys(this.technologies);
    this.isSearchDone = false;
    this.filterByTec = {};

    this.dataService
      .getUserList()
      .subscribe(
        data => {
          this.data = data;
          this.prepareData();
        },
        error => console.log(error)
      );

    this.dataService
      .getCityList()
      .subscribe(
        data => {
          this.typeAheadData = data;
          this.typeAheadDataLoaded = true;
        },
        error => console.log(error)
      )
  }

  doSearch(search?: string) {
    this.dataService.getUsersNearCity(search)
      .subscribe(
        data => {
          this.data = data;
          this.isSearchDone = true;
          this.prepareData();
        },
        error => console.log(error)
      );
  }

  prepareData(filterAvailable?: boolean) {
    this.users = this.data;
    if (filterAvailable) {
      this.users = this.filterAvailable(this.users);
    }
    this.paginate();
  }

  filterAvailable(users: UserListItem[]) {
    return _.filter(users, ['forProjects', true]);
  }

  paginate(search?: string) {
    this.count = this.users.length;
    this.pages = Array(Math.ceil(this.count / this.itemsPerPage));
    this.paginatedUsers = this.users.slice(0, this.itemsPerPage);
  }

  loadPage(index: number) {
    this.pageIndex = index;
    this.skip = this.pageIndex * this.itemsPerPage;
    this.paginatedUsers = this.users.slice(this.skip + 0, this.skip + this.itemsPerPage)
  };

  inValidateSearch() {
    this.ngOnInit();
  }

  onClick(username: string) {
    this.router.navigate(['/developer', username]);
  }
}
