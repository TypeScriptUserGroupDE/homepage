import {Component, OnInit} from '@angular/core';
import {UserDistance} from "../../common/UserDistance";
import {UserService} from './../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users: UserDistance[];

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.users = data['search']
    );

  }

}
