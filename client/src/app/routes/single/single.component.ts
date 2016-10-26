import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {MetaService} from 'ng2-meta';
import {User} from '../../components/User';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})

export class SingleComponent implements OnInit {
  sendMessageText: string;
  user: User;

  constructor(public http: Http,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private metaService: MetaService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.user = data['user'];
        this.user.tecList = [];
        this.hasTecSelected();

        // see https://github.com/vinaygopinath/ng2-meta/issues/7
        setTimeout(() => {
          this.metaService.setTitle(this.user.name + ' - TypeScript Entwickler in ' + this.user.city);
          this.metaService.setTag('keywords', this.user.tecList.toString() + ',' + this.user.city);
          this.metaService.setTag('description', this.user.description || this.user.name + ' verwendet TypeScript mit ' + this.user.tecList.toString());
        });
      }
    );

    //prevent 'cannot read propery of null' error
    if (this.user.tec === null) {
      this.user.tec = {};
    }

    if (this.authService.isLoggedIn() && this.authService.getUserName() !== this.user.login) {
      this.sendMessageText = "Nachricht senden";
    }
    else {
      this.sendMessageText = "Anmelden für Kontakt"
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasTecSelected() {
    let result = false;

    for (let i in this.user.tec) {
      if (this.user.tec[i] === true) {
        result = true;
        this.user.tecList.push(i);
      }
    }
  }

  sendMessage(username: string) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/entwickler/message', username]);
    } else {
      this.authService.login();
    }
  }
}
