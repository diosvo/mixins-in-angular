import { animate, style, transition, trigger } from '@angular/animations';

const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('500ms ease-in-out', style({ transform: 'translateY(0%)' }))
  ]),
  transition(':leave', [
    animate('500ms ease-in-out', style({ transform: 'translateY(-100%)' }))
  ])
]);

export { slideInOut };
