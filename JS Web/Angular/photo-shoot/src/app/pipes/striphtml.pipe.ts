import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml'
})
export class StriphtmlPipe implements PipeTransform {

  transform(value: string): any {
    if(value){
      return value.replace(/<.*?>/g, ''); // replace tags
    }
  }

}
