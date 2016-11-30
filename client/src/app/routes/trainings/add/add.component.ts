import {Component, OnInit, Input} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Training} from "../../../common/Training";
import {Technologies} from "../../../common/Technologies";
import {TrainingsService} from "../../../services/trainings/trainings.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

// todo: enter start and end date in form
// todo: line breaks for desc

export class TrainingsAddComponent implements OnInit {
  @Input() form: FormGroup;
  addressGroup: FormGroup;

  model: Training;
  isNew: Boolean = true;
  technologies = Technologies.get;

  constructor(private route: ActivatedRoute,
              private trainingsService: TrainingsService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  // todo: if title is not unique...
  ngOnInit() {
    this.route.data.subscribe(
      data => {
        if (data['training']) {
          this.isNew = false;
          this.model = data['training'];
          this.buildForm(this.model);
        } else {
          this.buildForm();
        }
      });
  }

  buildForm(model?) {

    if (model) {
      let obj: any = [];
      _.forEach(model.events, (e) => {
        obj.push(this.formBuilder.group({
            city: [e.city]
          })
        )
      });

      this.form = this.formBuilder.group({
        title: [model.title],
        tec: [model.tec],
        desc: [model.desc],
        company: [model.company],
        website: [model.website],
        cta_link: [model.cta_link],
        // email: ['', Validators.compose([this.emailValidator])],
        events: this.formBuilder.array(obj)
      });
    } else {

      this.addressGroup = this.formBuilder.group({
        city: [''],
      });

      this.form = this.formBuilder.group({
        title: [''],
        tec: [''],
        desc: [''],
        company: [''],
        website: [''],
        cta_link: [''],
        // email: ['', Validators.compose([this.emailValidator])],
        events: this.formBuilder.array([])
      });
    }
  }

  emailValidator(control: AbstractControl) {
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return EMAIL_REGEXP.test(control.value) ? null : {'email': true}
  }

  addEvent() {
    const arrayControl = <FormArray>this.form.controls['events'];
    let newAddress = this.formBuilder.group({
      city: [''],
    });
    arrayControl.push(newAddress);
  }

  // todo: delete city
  // todo: and delete empty city objects before submit
  onSubmit() {
    if (this.isNew) {
      this.trainingsService
        .createTraining(this.form.value)
        .subscribe(
          data => this.router.navigate(['/schulungen']),
          error => console.log(error)
        );
    } else {
      console.log(this.form.value);
      this.trainingsService
        .updateTraining(this.form.value)
        .subscribe(
          data => this.router.navigate(['/schulung', this.form.value.title]),
          error => console.log(error)
        );
    }
  }
}
