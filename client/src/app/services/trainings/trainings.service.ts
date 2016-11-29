import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {Training} from "../../common/Training";

@Injectable()

export class TrainingsService {
  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  constructor(public http: Http,
              public router: Router,
              public authHttp: AuthHttp) {

  }

  public getTraining():Observable<Training> {
    return this.http.get('/api/training/get')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getTrainingsList():Observable<Training[]> {
    return this.http.get('/api/training/get/all')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public createTraining(training: Training): Observable<Training> {
    return this.authHttp.post('/api/training/create',
      training,
      this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateTraining(training: Training): Observable<Training> {
    return this.authHttp.put('/api/training/update',
      training,
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
