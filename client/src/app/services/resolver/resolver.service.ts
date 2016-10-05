import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {User} from './../../components/User';
import {DataService} from "./../../services/data/data.service";
import {UserDistance} from "./../../components/UserDistance";

@Injectable()
export class SingleUserResolver implements Resolve<User> {
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.dataService.getSingleUser(route.params['username']);
  }
}

@Injectable()
export class UserAddResolver implements Resolve<User> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.dataService.getSingleUserWithAuthentication();
  }
}

@Injectable()
export class SearchResolver implements Resolve<UserDistance[]> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDistance[]> {
    return this.dataService.getUsersNearCity(route.params['city']);
  }
}


