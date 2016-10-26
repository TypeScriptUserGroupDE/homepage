export class User {

    constructor(public name?: string,
                public login?: string,
                public email?: string,
                public html_url?: string,
                public accessLevel?: number,
                public twitter?: string,
                public company_url?: string,
                public description?: string,
                public tecList?: string[],
                public city?: any,
                public availability?: {
                    [key: string]: boolean;
                    forProjects?: boolean,
                    greaterDistance?: boolean,
                },
                public tec?: {
                    [key: string]: boolean;
                    nodejs?: boolean,
                    angularjs?: boolean,
                    angular2?: boolean,
                    ionic?: boolean,
                    nativescript?: boolean,
                }) {
    }
}
