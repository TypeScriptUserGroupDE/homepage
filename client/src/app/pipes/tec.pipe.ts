import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'tec'
})
@Injectable()

export class TecPipe {
  transform(value: any, args: string[]): any {
    let out: any[] = [];
    for (let key in value) {
      if (value[key] === true) {
        out.push({key: 'tec', value: ' #' + key});
      }
    }

    if (out.length > 2) {
      let len:number = out.length;
      out = out.slice(0, 2);
      out.push({key: 'more', value: '+ ' + (len - out.length).toString()})
    }
    return out;
  }
}
