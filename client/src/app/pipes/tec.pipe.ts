import {Injectable, Pipe} from '@angular/core';
import {Technologies} from "../common/Technologies";

@Pipe({
  name: 'tec'
})
@Injectable()

export class TecPipe {
  technologies: Technologies;
  transform(value: any, args: string[]): any {
    this.technologies = Technologies.revMap;
    let maxItems = 5;
    let out: any[] = [];
    for (let key in value) {
      if (value[key] === true) {
        out.push({key: 'tec', value: this.technologies[key]});
      }
    }

    if (out.length > maxItems) {
      let len:number = out.length;
      out = out.slice(0, maxItems);
      out.push({key: 'more', value: '+ ' + (len - out.length).toString()})
    }
    return out;
  }
}
