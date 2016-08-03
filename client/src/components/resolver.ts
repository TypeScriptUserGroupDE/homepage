import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {User} from './User';
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class SingleUserResolver implements Resolve {
    user:any;
    body:{
        username?:string
    };

    constructor(public http:Http) {

    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<User> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.body = {};

        this.body.username = route.params['username'];
        console.log(route.params['username']);
        console.log(this.body);

        return this.http.post('/api/user/get',
            this.body,
            options)
            .map(res => res.json());

    }
}
