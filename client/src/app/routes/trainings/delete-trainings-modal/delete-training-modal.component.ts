import {Component, ViewChild, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDirective} from 'ng2-bootstrap';
import {AuthService} from './../../../services/auth/auth.service';
import {TrainingsService} from "../../../services/trainings/trainings.service";
import {Training} from "../../../common/Training";

@Component({
  selector: 'delete-training-modal',
  templateUrl: './delete-training-modal.component.html',
  styleUrls: ['./delete-training-modal.component.scss'],
  providers: [],
  exportAs: 'deleteTrainingModal'
})

export class DeleteTrainingModalComponent {
  @ViewChild('deleteTrainingModal') public deleteTrainingModal: ModalDirective;
  @Input() training: Training;

  constructor(private authService: AuthService,
              private router: Router,
              private trainingsService: TrainingsService) {
  }

  show() {
    this.deleteTrainingModal.show();
  }

  hide() {
    this.deleteTrainingModal.hide();
  }

  deleteUser() {
    this.trainingsService
    .deleteTrainings(this.training._id)
    .subscribe(
      data => {
        this.router.navigate(['/schulungen']);
        this.hide();
      },
      error => console.log(error)
    );
  }
}
