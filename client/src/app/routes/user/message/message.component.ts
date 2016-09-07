import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  REACTIVE_FORM_DIRECTIVES
}    from '@angular/forms';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {Http} from '@angular/http';
import {User} from '../../../components/User';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {DataService} from "../../../services/data/data.service";

@Component({
  selector: 'user-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, AlertComponent],
  providers: []
})

export class UserMessageComponent implements OnInit {
  form: FormGroup;
  user: User;
  username: string;

  model: {
    username?: string,
    subject?: string,
    message?: string
  };

  alerts = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private dataService: DataService) {

    this.form = new FormGroup({
      required: new FormControl("", Validators.required)
    });

    this.model = {};
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.alerts.push({msg: 'Nachricht gesendet', type: 'success'});
  }

  onSubmit() {
    this.model.username = this.user.login;

    this.dataService
      .sendMessageToUser(this.model)
      .subscribe(
        data => {
          // this.router.navigate(['/developer', this.model.username]);
          this.alerts.push({msg: 'Nachricht gesendet', type: 'success'});
        },
        error => console.log(error)
      );
  }
}
