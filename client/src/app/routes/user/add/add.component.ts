import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from './../../../components/User';
import {DataService} from "../../../services/data/data.service";

@Component({
  selector: 'user-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class UserAddComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([this.emailValidator])),
      zip: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}')])),
      required: new FormControl('', Validators.required)
    });
  }

  model = new User();

  ngOnInit() {
    this.model = this.route.snapshot.data['user'];

    //prevent 'cannot read propery of null' error
    if (this.model.tec === null) {
      this.model.tec = {};
    }
  }

  emailValidator(control: AbstractControl) {
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return EMAIL_REGEXP.test(control.value) ? null : {'email': true}
  }

  onSubmit() {
    this.dataService
      .updateUser(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/directory']);
        },
        error => console.log(error)
      )
    ;
  }
}
