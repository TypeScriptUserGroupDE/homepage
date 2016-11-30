import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TrainingsService} from "../../../services/trainings/trainings.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Training} from "../../../common/Training";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class TrainingsSingleComponent implements OnInit {
  training: Training;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private trainingsService: TrainingsService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.training = data['training'];
      }
    );
  }

  // todo: Schulung bearbeiten, if eigene

}
