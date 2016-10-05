import {Injectable, Pipe} from '@angular/core';
import {UserListItem} from "../components/UserListItem";

@Pipe({
  name: 'filterTec',
  pure: false
})
@Injectable()

export class filterTecPipe {

  transform(value: UserListItem[], filterByTec: any) {
    let filter = {};
    _.forEach(filterByTec, function (item, key) {
      if (item === true) {
        filter[key] = item;
      }
    });

    return _.filter(value, filter);
  }
}
