import {Injectable} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {User} from "../components/User";
import {UserListItem} from "../components/UserListItem";

@Injectable()

export class DataService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(public http: Http,
                public router: Router,
                public authHttp: AuthHttp) {

    }

    getUserList(): Observable<UserListItem[]> {
        return this.http.get('/api/user/get/all')
            .map(this.extractData)
            .catch(this.handleError)
    }

    getSingleUser(username: string): Observable<User> {
        return this.http.post('/api/user/get',
            {username: username},
            this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSingleUserWithAuthentication(): Observable<User> {
        return this.authHttp.get('/api/user/get/form')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMapMarkers(): Observable<Marker[]> {
        return this.http.get('/api/user/get/map')
            .map(this.extractData)
            .catch(this.handleError)
    }

    updateUser(data: any): Observable<any> {
        return this.authHttp.put('/api/user/update',
            data,
            this.options)
            .map(this.extractData)
    }

    deleteUser(): Observable<User> {
        return this.authHttp.delete('/api/user/delete')
            .map(this.extractData)
            .catch(this.handleError);
    }

    gitHubAuth(code: string): Observable<any> {
        return this.http.post(
            '/api/login',
            {code: code},
            this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    sendMessageToUser(data: any): Observable<any> {
        return this.authHttp.post('/api/user/send/mail',
            data,
            this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}