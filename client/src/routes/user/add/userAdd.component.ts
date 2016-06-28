import {Component, OnInit} from '@angular/core';
import {NgForm, Control, Validators, FormBuilder, ControlGroup}    from '@angular/common';
import {Http} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../user';

@Component({
    selector: 'user-add',
    templateUrl: './routes/user/add/user.add.html',
    directives: [ROUTER_DIRECTIVES],
    providers: []
})

export class UserAddComponent implements OnInit {
    email:Control;
    zip:Control;
    required:Control;
    form:ControlGroup;

    constructor(private router:Router,
                public http:Http,
                public authHttp:AuthHttp,
                private builder:FormBuilder) {

        this.email = new Control("", Validators.compose([this.emailValidator]));
        this.zip = new Control("", Validators.compose([Validators.pattern('[0-9]{5}')]));
        this.required = new Control("", Validators.required);

        this.form = builder.group({
            email: this.email,
            zip: this.zip,
            required: this.required
        });
    }

    model = new User();

    ngOnInit() {
        this.authHttp.get('/api/user/get/form')
            .map(res => res.json())
            .subscribe(
                data => this.model = data
            );
    }

    emailValidator(c:Control) {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        }
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
                    console.log(data);
                    this.router.navigate(['List']);
                },
                error => console.log(error),
                () => console.log('Login successful')
            )
        ;
    }


    // onClick() {
    //     this.router.navigate(['Single']);
    // }
}