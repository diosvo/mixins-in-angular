import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {

  transform(text: string): string {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
}

@NgModule({
  declarations: [LineBreakPipe],
  exports: [LineBreakPipe],
})
export class LineBreakPipeModule { }