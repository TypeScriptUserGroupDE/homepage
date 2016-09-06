import {Component, ViewContainerRef} from '@angular/core';
import {Router, Event, NavigationEnd} from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})

export class AppComponent {
  viewContainerRef: ViewContainerRef;

  constructor(public router: Router,
              viewContainerRef: ViewContainerRef) {

    // ng2-bootstrap: You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          (<any>window).dataLayer.push({
            event: 'pageView',
            category: '',
            label: '',
            action: event.urlAfterRedirects,
            value: ''
          });

        }
      });
  }
}