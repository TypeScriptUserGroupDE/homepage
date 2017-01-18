import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {Training} from "../../common/Training";
import {Marker} from "../../common/Marker";

@Injectable()

export class TrainingsService {
  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  constructor(public http: Http,
              public router: Router,
              public authHttp: AuthHttp) {

  }

  public getTraining(title_link): Observable<Training> {
    return this.http.post('/api/training/get',
      {title_link: title_link},
      this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public getTrainingsList(): Observable <Training[]> {
    return this.http.get('/api/training/get/all')
    .map(this.extractData)
    .catch(this.handleError);
  }

  public createTraining(training: Training): Observable <Training> {
    return this.authHttp.post('/api/training/create',
      training,
      this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public updateTraining(training: Training): Observable <Training> {
    return this.authHttp.put('/api/training/update',
      training,
      this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public deleteTrainings(id) {
    return this.authHttp.delete('/api/training/delete',
      new RequestOptions({headers: this.headers, body: {id: id}})) // http delete does not allow body, working around
    .map(this.extractData)
    .catch(this.handleError);
  }

  public getTrainingsNearCity(city: string, distance: any) {
    distance = distance || 25000;

    return this.getCoordinates(city)
    .flatMap(data => {
      return this.http.post('/api/training/get/near',
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
    });


    // return this.http.post('/api/training/get/near',
    //   {city: city, distance: distance},
    //   this.options)
    // .map(this.extractData)
    // .catch(this.handleError);

  }

  public getCoordinates(location: string): Observable <any> {
    return this.http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?language=de&region=de&address=' + encodeURIComponent(location))
    .map(this.extractData)
    .catch(this.handleError);
  }

  getMapMarkers(): Observable<Marker[]> {
    return this.http.get('/api/training/get/map')
    .map(this.extractData)
    .catch(this.handleError)
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
