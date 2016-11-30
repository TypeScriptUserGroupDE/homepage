import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {TrainingsService} from "../../../services/trainings/trainings.service";
import {Training} from "../../../common/Training";

@Component({
  selector: 'app-trainings',
  templateUrl: './list.trainings.component.html',
  styleUrls: ['./list.trainings.component.scss']
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[];
  createTrainingMessage: string = "Eigene Schulung erstellen";

  constructor(private router: Router,
              private authService: AuthService,
              private trainingsService: TrainingsService) {
  }

  ngOnInit() {
    this.trainingsService
      .getTrainingsList()
      .subscribe(data => {
        this.trainings = data;
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // goToSingle(company: string, title: string) {
  //   this.router.navigate(['/schulung', {company: company, title: title}]);
  // }
}
