import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {User} from './../../common/User';
import {UserListItem} from './../../common/UserListItem';
import {Marker} from '../../common/Marker';
import {UserDistance} from "../../common/UserDistance";

@Injectable()

export class UserService {
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
    .catch(this.handleError)
  }

  deleteUser(): Observable<User> {
    return this.authHttp.delete('/api/user/delete')
    .map(this.extractData)
    .catch(this.handleError);
  }

  gitHubAuth(code: string): Observable<any> {
    return this.http.post('/api/login',
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

  getCityList(): Observable<[string]> {
    return this.http.get('/api/city/get',
      this.options)
    .map(this.extractData)
    .catch(this.handleError);

  }

  getUsersNearCity(city: string, distance?: number): Observable<UserListItem[]> {
    distance = distance || 25000;

    return this.getCoordinates(city)
    .flatMap(data => {
      return this.http.post('/api/user/get/near',
        {
          city: city,
          distance: distance,
          country: data.results[0].address_components[data.results[0].address_components.length - 1].long_name,
          coordinates: [
            data.results[0].geometry.location.lng,
            data.results[0].geometry.location.lat,
          ]
        },
        this.options)
      .map(this.extractData)
      .catch(this.handleError);
    })

  }

  public getCoordinates(location: string): Observable <any> {
    return this.http.get(
      'http://maps.googleapis.com/maps/api/geocode/json?language=de&region=de&address=' + encodeURIComponent(location))
    .map(this.extractData)
    .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    console.log(error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log(error);
    return Observable.throw(errMsg);
  }

}
