import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
// import {ListComponent} from '../list/ListComponent';

@Directive({
    selector: 'router-outlet'
})
export class ProtectedRouterOutlet extends RouterOutlet {
    publicRoutes: any;
    private parentRouter: Router;

    constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
                _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_viewContainerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        // The Boolean following each route below
        // denotes whether the route requires authentication to view
        this.publicRoutes = {
            'accessToken': true,
            'single': false,
            'list': false,
            'user': true
        };
    }

    activate(instruction: ComponentInstruction) {
        let url = instruction.urlPath;
        if (!this.publicRoutes[url] && !localStorage.getItem('token')) {
            this.parentRouter.navigateByUrl('/list');
        }
        return super.activate(instruction);
    }
}