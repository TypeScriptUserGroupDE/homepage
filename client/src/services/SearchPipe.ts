import {Injectable, Pipe} from '@angular/core';
import {UserListItem} from "../components/UserListItem";

@Pipe({
    name: 'search'
})
@Injectable()

export class SearchPipe {

    transform(value:UserListItem[], term:string) {
        if (term.length === 0) return value;
        return value.filter((item: UserListItem) => item.city.toLowerCase().startsWith(term.toLowerCase()))
    }
}