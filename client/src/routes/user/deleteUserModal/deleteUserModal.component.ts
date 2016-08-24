import {Component, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from './../../../services/AuthService';

@Component({
    selector: 'delete-user-modal',
    templateUrl: './routes/user/deleteUserModal/deleteUserModal.html',
    directives: [CORE_DIRECTIVES, MODAL_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS],
    providers: [],
    exportAs: 'child'
})

export class DeleteUserModalComponent {
    @ViewChild('deleteUserModal') public deleteUserModal:ModalDirective;


    constructor(private authHttp: AuthHttp,
                private authService: AuthService) {
    }

    show() {
        this.deleteUserModal.show();
    }

    hide() {
        this.deleteUserModal.hide();
    }

    deleteUser() {
        this.authHttp.delete('/api/user/delete')
            .map(res => res.json())
            .subscribe(
                data => {
                    this.authService.logout();
                    this.hide();
                },
                error => console.log(error)
            );
    }
}