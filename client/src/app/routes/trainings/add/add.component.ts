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

  model: Training = {
    events: [{}]
  };
  isNew: Boolean = true;
  technologies = Technologies.get;

  constructor(private route: ActivatedRoute,
              private trainingsService: TrainingsService,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.addressGroup = this.formBuilder.group({
      address: [''],
      houseNumber: [''],
      city: [''],
      zip: ['', [Validators.pattern('[0-9]{5}')]],
      startDate: [''],
      endDate: ['']
    });

    this.form = this.formBuilder.group({
      title: [''],
      tec: [''],
      desc: [''],
      company: [''],
      website: [''],
      cta_link: [''],
      email: ['', Validators.compose([this.emailValidator])],
      events: this.formBuilder.array([

      ])
    });
  }

  ngOnInit() {
    if (this.route.params['id']) {
      this.isNew = false;
    }
  }

  emailValidator(control: AbstractControl) {
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return EMAIL_REGEXP.test(control.value) ? null : {'email': true}
  }

  addEvent() {
    const arrayControl = <FormArray>this.form.controls['events'];
    arrayControl.push(this.addressGroup);
  }

  // todo: delete event

  onSubmit() {
    if (this.isNew) {
      this.trainingsService
        .createTraining(this.form.value)
        .subscribe(
          data => this.router.navigate(['/trainings']),
          error => console.log(error)
        );
    } else {
      this.trainingsService
        .updateTraining(this.model)
        .subscribe(
          data => this.router.navigate(['/trainings']),
          error => console.log(error)
        );
    }
  }
}
