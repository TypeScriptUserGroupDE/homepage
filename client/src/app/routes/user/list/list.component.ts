import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {UserListItem} from '../../../common/UserListItem';
import {UserService} from './../../../services/user/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Input() search: string = "";
  distance: number = 25000; // default search distance
  users: UserListItem[]; // all users
  searchTerm: string;
  count: number;
  filterByTec: any;
  isSearchDone: boolean;
  noResults: boolean;
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
              private userService: UserService) {
  }

  ngOnInit() {
    this.technologiesArray = Object.keys(this.technologies);
    this.isSearchDone = false;
    this.filterByTec = {};

    this.userService
      .getUserList()
      .subscribe(
        data => {
          this.users = data;
          this.noResults = false;
          if (this.users.length === 0) {
            this.noResults = true;
          }
        },
        error => console.log(error)
      );

    this.userService
      .getCityList()
      .subscribe(
        data => {
          this.typeAheadData = data;
          this.typeAheadDataLoaded = true;
        },
        error => console.log(error)
      )
  }

  doSearch(search: string, distance) {
    if (search === "") {
      this.inValidateSearch();
      return
    }
    this.userService.getUsersNearCity(search, distance)
      .subscribe(
        data => {
          this.users = data;
          this.isSearchDone = true;
          this.searchTerm = search;
          this.noResults = false;
          if (this.users.length === 0) {
            this.noResults = true;
          }
        },
        error => console.log(error)
      );
  }

  filterAvailable(users: UserListItem[]) {
    return _.filter(users, ['forProjects', true]);
  }

  inValidateSearch() {
    this.ngOnInit();
  }

  goToSingle(username: string) {
    this.router.navigate(['/entwickler', username]);
  }
}
