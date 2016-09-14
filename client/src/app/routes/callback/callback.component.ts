import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent implements OnInit {
  code: string;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(
        params => this.code = params['code']
      );

    this.dataService
      .gitHubAuth(this.code)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          if (data.user.active === false) {
            this.router.navigateByUrl('/user/add');
          } else {
            this.router.navigateByUrl('/directory');
          }
        },
        error => console.log(error)
      );
  }

}
