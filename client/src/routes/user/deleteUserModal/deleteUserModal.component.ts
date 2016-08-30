import {Component, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthService} from './../../../services/AuthService';
import {DataService} from "../../../services/DataService";

@Component({
    selector: 'delete-user-modal',
    templateUrl: './routes/user/deleteUserModal/deleteUserModal.html',
    directives: [CORE_DIRECTIVES, MODAL_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS],
    providers: [],
    exportAs: 'deleteUserModal'
})

export class DeleteUserModalComponent {
    @ViewChild('deleteUserModal') public deleteUserModal: ModalDirective;


    constructor(private authService: AuthService,
                private dataService: DataService) {
    }

    show() {
        this.deleteUserModal.show();
    }

    hide() {
        this.deleteUserModal.hide();
    }

    deleteUser() {
        this.dataService
            .deleteUser()
            .subscribe(
                data => {
                    this.authService.logout();
                    this.hide();
                },
                error => console.log(error)
            );
    }
}