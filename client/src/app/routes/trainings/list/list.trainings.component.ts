import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {TrainingsService} from "../../../services/trainings/trainings.service";
import {Training} from "../../../common/Training";
import {Technologies} from "../../../common/Technologies";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-trainings',
  templateUrl: './list.trainings.component.html',
  styleUrls: ['./list.trainings.component.scss']
})
export class TrainingsListComponent implements OnInit {
  distance: number = 25000; // default search distance
  isSearchDone: boolean;
  searchTerm: string;
  noResults: boolean;
  p: number;

  typeAheadData: any;
  typeAheadDataLoaded: boolean = false;

  trainings: Training[];
  technologiesArray: string[];
  technologies: {};
  technologiesRevMap: {};
  filterByTec: string;
  createTrainingMessage: string = "Eigene Schulung erstellen";

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private trainingsService: TrainingsService) {
  }

  ngOnInit() {
    this.isSearchDone = false;
    this.technologies = Technologies.map;
    this.technologiesRevMap = Technologies.revMap;
    this.technologiesArray = Object.keys(this.technologies);

    this.trainingsService
      .getTrainingsList()
      .subscribe(data => {
        this.trainings = data;
        this.noResults = false;
        if (this.trainings.length === 0) {
          this.noResults = true;
        }
      });

    this.userService
      .getCityList()
      .subscribe(
        data => {
          this.typeAheadData = data;
          this.typeAheadDataLoaded = true;
        },
        error => console.log(error)
      )
  }

  resetPagination() {
    this.p = 0;
  }

  doSearch(search: string, distance) {
    if (search === "") {
      this.inValidateSearch();
      return
    }
    this.trainingsService.getTrainingsNearCity(search, distance)
      .subscribe(
        data => {
          this.trainings = data;
          this.isSearchDone = true;
          this.searchTerm = search;
          this.noResults = false;
          if (this.trainings.length === 0) {
            this.noResults = true;
          }

        },
        error => console.log(error)
      );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  inValidateSearch() {
    this.filterByTec = '';
    this.ngOnInit();
  }
}
