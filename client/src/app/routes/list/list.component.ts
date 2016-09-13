import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {UserListItem} from '../../components/UserListItem';
import {SearchPipe} from './../../pipes/search.pipe';
import {TecPipe} from './../../pipes/tec.pipe';
import {DataService} from './../../services/data/data.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Input() search: string = "";
  users: UserListItem[];
  paginatedUsers: UserListItem[];
  filteredUsers: UserListItem[];
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
              public http: Http,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.isSearchDone = false;

    this.dataService
      .getUserList()
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
