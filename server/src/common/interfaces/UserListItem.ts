export interface UserListItem {
    dis?: number;
    name: string;
    login: string;
    avatar_url: string;
    city: any;
    forProjects: boolean;
    greaterDistance: boolean;
    nodejs: boolean,
    angularjs: boolean,
    angular2: boolean,
    ionic: boolean,
    nativescript: boolean,
    tec: {
        nodejs: boolean;
        angularjs: boolean;
        angular2: boolean;
        ionic: boolean;
        nativescript: boolean;
    }
}