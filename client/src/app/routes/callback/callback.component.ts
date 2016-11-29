import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent implements OnInit {
  code: string;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private dataService: UserService) {
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
            this.router.navigateByUrl('/entwickler/profil');
          } else {
            this.router.navigateByUrl('/entwickler');
          }
        },
        error => console.log(error)
      );
  }

}
