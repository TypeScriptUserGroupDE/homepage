import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
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
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];


    //prevent 'cannot read propery of null' error
    if (this.user.tec === null) {
      this.user.tec = {};
    }

    if (this.authService.isLoggedIn() && this.authService.getUserName() !== this.user.name) {
      this.sendMessageText = "Nachricht senden";
    } else {
      this.sendMessageText = "Anmelden für Kontakt";
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasTecSelected() {
    let result = true;

    for (let i in this.user.tec) {
      if (this.user.tec[i] === false) {
        result = false;
        break;
      }
    }

    return result
  }

  sendMessage(username: string) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user/message', username]);
    } else {
      this.authService.login();
    }
  }
}
