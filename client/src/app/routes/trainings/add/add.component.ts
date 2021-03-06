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
  @Input() event: FormGroup;
  addressGroup: FormGroup;
  alerts = [];
  model: Training;
  eventModel: any;
  isNew: Boolean = true;
  technologiesArray: string[] = Technologies.array;
  technologies: {} = Technologies.revMap;

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

  emailValidator(control: AbstractControl) {
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return EMAIL_REGEXP.test(control.value) ? null : {'email': true}
  }

  linkValidator(control: AbstractControl) {
    let LINK_REGEXP = /^(https?):\/\/.*$/i;
    return (control.value.length === 0 || LINK_REGEXP.test(control.value)) ? null : {'link': true}
  }

  deleteEvent(index) {
    const arrayControl = <FormArray>this.form.controls['events'];
    arrayControl.removeAt(index);
  }

  // google maps api does not allow bulk geocoding of addresses.
  // Therefore it seems better to gecode each location "manually"
  // todo: caching of already requested entries
  saveEvent() {
    //get hold of all relevant input fields
    const cityControl = <FormGroup>this.event.controls['city'];
    const lngControl = <FormGroup>this.event.controls['lng'];
    const latControl = <FormGroup>this.event.controls['lat'];
    const arrayControl = <FormArray>this.form.controls['events'];

    this.trainingsService
    .getCoordinates(cityControl.value)
    .subscribe(data => {
      // insert coordinates into main form
      let newAddress = this.formBuilder.group({
        city: [cityControl.value, Validators.compose([Validators.required])],
        lat: [data.results[0].geometry.location.lat, Validators.compose([Validators.required])],
        lng: [data.results[0].geometry.location.lng, Validators.compose([Validators.required])]
      });
      arrayControl.push(newAddress);
      cityControl.reset();
    })
  }

  // todo: delete city
  // todo: and delete empty city objects before submit
  onSubmit() {
    let data = this.form.value;
    _.forEach(data.events, (event, key) => {
      data.events[key].loc = [];
      data.events[key].loc[0] = event.lng;
      data.events[key].loc[1] = event.lat;
    });

    if (this.isNew) {
      this.trainingsService
      .createTraining(this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['/schulung', data.title_link]);
        },
        error => this.onError(error)
      );
    } else {
      let obj = this.form.value;
      obj._id = this.model._id;

      this.trainingsService
      .updateTraining(obj)
      .subscribe(
        data => {
          this.router.navigate(['/schulung', data.title_link]);
        },
        error => this.onError(error)
      );
    }
  }

  onError(error) {
    this.alerts = [];
    this.alerts.push({msg: 'Es existiert bereits eine Schulung mit diesem Namen', type: 'danger'});
    console.log(error)
  }

  // load existing data into main form
  buildForm(model?) {
    let input = (model) ? model : {};
    let title = input.title || '';
    let tec = input.tec || '';
    let desc = input.desc || '';
    let company = input.company || '';
    let website = input.website || '';
    let cta_link = input.cta_link || '';
    let obj: any = [];

    if (model) {
      _.forEach(model.events, (e) => {
        obj.push(this.formBuilder.group({
            city: [e.city, Validators.compose([Validators.required])],
            lat: [e.loc[1], Validators.compose([Validators.required])],
            lng: [e.loc[0], Validators.compose([Validators.required])]
          })
        )
      });

    } else {
      this.addressGroup = this.formBuilder.group({
        city: [''],
        lat: [''],
        lng: ['']
      });
    }

    // main form
    this.form = this.formBuilder.group({
      title: [title, Validators.compose([Validators.required, Validators.pattern('[aA-zZäöüß0-9 ]*')])],
      tec: [tec, Validators.compose([Validators.required])],
      desc: [desc, Validators.compose([Validators.required])],
      company: [company, Validators.compose([Validators.required])],
      website: [website, Validators.compose([Validators.required, this.linkValidator])],
      cta_link: [cta_link, Validators.compose([Validators.required, this.linkValidator])],
      // email: ['', Validators.compose([this.emailValidator])],
      events: this.formBuilder.array(obj)
    });

    // helper form, will hold location data while we get the coordinates
    this.event = this.formBuilder.group({
      city: ['', Validators.compose([])],
    })
  }
}
