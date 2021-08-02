import { animate, style, transition, trigger } from '@angular/animations';

const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('200ms ease-in-out', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in-out', style({ transform: 'translateX(-100%)' }))
  ])
]);

export { slideInOut };
