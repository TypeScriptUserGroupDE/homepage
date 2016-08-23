import {Injectable, Pipe} from '@angular/core';
import {User} from "../components/User";

@Pipe({
    name: 'search'
})
@Injectable()

export class SearchPipe {

    transform(value:User[], term:string) {
        if (term.length === 0) return value;
        return value.filter((item: User) => item.city.toLowerCase().startsWith(term.toLowerCase()))
    }
}