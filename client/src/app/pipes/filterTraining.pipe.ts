import {Injectable, Pipe} from '@angular/core';
import {UserListItem} from "../common/UserListItem";
import * as _ from "lodash";
import {Training} from "../common/Training";

@Pipe({
  name: 'filterTrainingsByTec',
  pure: false
})
@Injectable()

export class filterTrainingsByTec {

  transform(value: Training[], filterByTec: any) {
    return (filterByTec) ? _.filter(value, {'tec': filterByTec}) : value;
  }
}
