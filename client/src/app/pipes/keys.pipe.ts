import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'keys'
})
@Injectable()

export class KeysPipe {
  transform(value:any, args: string[]): any {
    let keys:any[] = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
