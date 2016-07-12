// import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
// import {Router, RouterOutlet} from '@angular/router';
//
// @Directive({
//     selector: 'router-outlet'
// })
// export class ProtectedRouterOutlet extends RouterOutlet {
    // publicRoutes: any;
    // private parentRouter: Router;
    //
    // constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
    //             _parentRouter: Router, @Attribute('name') nameAttr: string) {
    //     super(_viewContainerRef, _loader, _parentRouter, nameAttr);
    //
    //     this.parentRouter = _parentRouter;
    //     // The Boolean following each route below
    //     // denotes whether the route requires authentication to view
    //     this.publicRoutes = {
    //         'Callback': true,
    //         'Single': true,
    //         'UserAdd': false,
    //         'UserMessage': false,
    //         'Map': true,
    //         'List': true,
    //         'User': true
    //     };
    // }
    //
    // activate(instruction: ComponentInstruction) {
    //     let route = instruction.routeName;
    //     if (!this.publicRoutes[route] && !localStorage.getItem('token')) {
    //         this.parentRouter.navigateByUrl('/list');
    //     }
    //     return super.activate(instruction);
    // }
// }