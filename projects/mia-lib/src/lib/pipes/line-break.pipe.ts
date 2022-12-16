import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak',
  standalone: true
})
export class LineBreakPipe implements PipeTransform {

  transform(text: string): string {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}
