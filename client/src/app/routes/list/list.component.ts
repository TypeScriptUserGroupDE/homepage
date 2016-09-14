import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {UserListItem} from '../../components/UserListItem';
import {SearchPipe} from './../../pipes/search.pipe';
import {DataService} from './../../services/data/data.service';
import * as _ from 'lodash';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Input() search: string = "";
  term: string = "";
  users: UserListItem[]; // all users
  filteredUsers: UserListItem[]; // users which match search term
  paginatedUsers: UserListItem[]; // split user array into multiple pages
  text: string;
  count: number;
  itemsPerPage: number = 9;
  pages: number[];
  pageIndex: number = 0;
  skip: number = 0;
  isSearchDone: boolean = false;
  city: string;
  typeAheadData: any;
  technologies: string[] = ['angularjs', 'angular2', 'nodejs', 'ionic', 'nativescript'];

  constructor(public router: Router,
              public http: Http,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.isSearchDone = false;

    this.dataService
      .getUserList()
      .subscribe(
        data => {
          this.users = this.flatten(data);
          this.typeAheadData = _.uniq(_.map(this.users, 'city'));
          this.typeAheadData = this.typeAheadData.concat(this.technologies);
          this.paginate();
        },
        error => console.log(error)
      );
  }

  paginate(search?: string) {
    this.term = this.search || "";

    this.filteredUsers = new SearchPipe().transform(this.users, this.term);
    this.count = this.filteredUsers.length;
    this.pages = Array(Math.ceil(this.count / this.itemsPerPage));
    this.paginatedUsers = this.filteredUsers.slice(0, this.itemsPerPage);
  }

  loadPage(index: number) {
    this.pageIndex = index;
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


  // flatten data to make it easily filter-able
  // todo: potenial performance problem
  flatten(data: UserListItem[]) {
    return _.forEach(data, function (item: UserListItem, key: string) {
      _.forEach(item.tec, function (obj: string, key: string) {
        item[key] = obj;
      });
    });
  }

}
