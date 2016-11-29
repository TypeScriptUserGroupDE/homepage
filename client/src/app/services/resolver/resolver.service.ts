import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {User} from './../../common/User';
import {UserService} from "../user/user.service";
import {UserDistance} from "../../common/UserDistance";

@Injectable()
export class SingleUserResolver implements Resolve<User> {
  constructor(private dataService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.dataService.getSingleUser(route.params['username']);
  }
}

@Injectable()
export class UserAddResolver implements Resolve<User> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getSingleUserWithAuthentication();
  }
}

@Injectable()
export class SearchResolver implements Resolve<UserDistance[]> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDistance[]> {
    return this.userService.getUsersNearCity(route.params['city']);
  }
}


