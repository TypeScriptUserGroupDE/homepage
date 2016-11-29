import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {TrainingsService} from "../../services/trainings/trainings.service";
import {Training} from "../../common/Training";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {
  trainings: Training[];
  createTrainingMessage: string = "Eigene Schulung erstellen";

  constructor(private authService: AuthService,
              private trainingsService: TrainingsService) {
  }

  ngOnInit() {
    this.trainingsService
      .getTrainingsList()
      .subscribe(data => this.trainings = data);
  }

}
