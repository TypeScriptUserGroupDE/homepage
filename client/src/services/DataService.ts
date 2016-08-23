import {Injectable} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Router, CanActivate} from '@angular/router';
import {AppConfig} from './../config/config';

@Injectable()

export class DataService {

    constructor(public http: Http,
                public router: Router,
                public authHttp: AuthHttp) {

    }

    inValidateSearch() {

    }

    search(city?: string, tec?: string) {

    }

}