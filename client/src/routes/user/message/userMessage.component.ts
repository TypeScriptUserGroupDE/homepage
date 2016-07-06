import {Component, OnInit} from '@angular/core';
import {NgForm, Control, Validators, FormBuilder, ControlGroup}    from '@angular/common';
import {Http} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, RouteParams, Router} from '@angular/router-deprecated';
import {AuthHttp} from 'angular2-jwt';

@Component({
    selector: 'user-message',
    templateUrl: './routes/user/message/user.message.html',
    directives: [ROUTER_DIRECTIVES],
    providers: []
})

export class UserMessageComponent implements OnInit {
    required:Control;
    form:ControlGroup;

    model:{
        id?:string,
        subject?:string,
        message?:string
    };

    constructor(private router:Router,
                public http:Http,
                public authHttp:AuthHttp,
                private routeParams:RouteParams,
                private builder:FormBuilder) {

        this.required = new Control("", Validators.required);
        this.form = builder.group({
            required: this.required
        });

        this.model = {};
    }

    ngOnInit() {
    }

    onSubmit() {
        this.model.id = this.routeParams.get('userid');

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.authHttp.post('/api/user/send/mail', JSON.stringify(this.model), options)
            .map(res => {
                let body = res.json();
                return body
            })
            .subscribe(
                data => {
                    console.log("done");
                    console.log(data);
                },
                error => console.log(error),
                () => console.log('Login successful')
            );
    }
}