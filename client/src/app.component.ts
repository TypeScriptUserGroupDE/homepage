import {Component, ViewContainerRef} from '@angular/core';
import {Router, Event, NavigationEnd} from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    providers: []
})

export class AppComponent {
    viewContainerRef:ViewContainerRef;

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