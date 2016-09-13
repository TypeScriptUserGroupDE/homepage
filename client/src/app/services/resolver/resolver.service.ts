import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {User} from './../../components/User';
import {DataService} from "./../../services/data/data.service";

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

