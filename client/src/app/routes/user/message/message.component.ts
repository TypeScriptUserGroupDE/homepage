import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
}    from '@angular/forms';
import {Http} from '@angular/http';
import {User} from '../../../components/User';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../../../services/data/data.service";

@Component({
  selector: 'user-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
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

  constructor(private route: ActivatedRoute,
              public http: Http,
              private dataService: DataService) {

    this.form = new FormGroup({
      required: new FormControl("", Validators.required)
    });

    this.model = {};
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.user = data['user']
    );
  }

  onSubmit() {
    this.model.username = this.user.login;

    this.dataService
      .sendMessageToUser(this.model)
      .subscribe(
        data => {
          this.alerts.push({msg: 'Nachricht gesendet', type: 'success'});
          this.model = {};
        },
        error => {
          this.alerts.push({msg: 'Bitte fülle erst dein Profil vollständig aus', type: 'danger'});
          this.model = {};
        }
      );
  }
}
