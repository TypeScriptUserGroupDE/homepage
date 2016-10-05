import {Component, OnInit} from '@angular/core';
import {UserDistance} from "../../components/UserDistance";
import {DataService} from './../../services/data/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users: UserDistance[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.users = data['search']
    );

  }

}
