import {Component, OnInit} from '@angular/core';
import {
  NgForm,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  REACTIVE_FORM_DIRECTIVES
}    from '@angular/forms';
import {Http} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {User} from '../../../components/User';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {DataService} from "../../../services/data/data.service";

@Component({
  selector: 'user-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
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
  }

  onSubmit() {
    this.model.username = this.user.login;

    this.dataService
      .sendMessageToUser(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/developer', this.model.username]);
        },
        error => console.log(error)
      );
  }
}
