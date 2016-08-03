import {Component, OnInit} from '@angular/core';
import {
    NgForm,
    FormControl,
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';
import {Http} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {ActivatedRoute, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../../../components/User';

@Component({
    selector: 'user-add',
    templateUrl: './routes/user/add/user.add.html',
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    providers: []
})

export class UserAddComponent implements OnInit {
    form:FormGroup;

    constructor(private router:Router,
                public http:Http,
                public authHttp:AuthHttp,
                private route:ActivatedRoute) {

        this.form = new FormGroup({
            email: new FormControl('', Validators.compose([this.emailValidator])),
            zip: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}')])),
            required: new FormControl('', Validators.required)
        });
    }

    model = new User();

    ngOnInit() {
        this.model = this.route.snapshot.data['user'];

        //prevent 'cannot read propery of null error
        if (this.model.tec === null) {
            this.model.tec = {};
        }
    }

    emailValidator(control:AbstractControl) {
        let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return EMAIL_REGEXP.test(control.value) ? null : {'email': true}
    }

    onSubmit() {
        let body = JSON.stringify(this.model);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.authHttp.put('/api/user/update', body, options)
            .map(res => {
                let body = res.json();
                return body
            })
            .subscribe(
                data => {
                    console.log("done");
                    // console.log(data);
                    this.router.navigate(['/directory']);
                },
                error => console.log(error),
                () => console.log('Login successful')
            )
        ;
    }
}