import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {User} from './../../common/User';
import {UserService} from "../user/user.service";
import {UserDistance} from "../../common/UserDistance";
import {TrainingsService} from "../trainings/trainings.service";
import {Training} from "../../common/Training";

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

@Injectable()
export class SingleTrainingResolver implements Resolve<Training> {
  constructor(private trainingsService: TrainingsService) {
    console.log('check');
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training> {
    return this.trainingsService.getTraining(route.params['title']);
  }
}

@Injectable()
export class TrainingAddResolver implements Resolve<Training> {

  constructor(private trainingsService: TrainingsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training> {
    return this.trainingsService.getTraining(route.params['title']);
  }
}
