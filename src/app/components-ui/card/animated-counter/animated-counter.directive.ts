import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DEFAULT_ANIMATION_SPEED = 8;

@Directive({
  selector: '[appAnimatedCounter]',
})
export class AnimatedCounterDirective implements OnInit {
  @Input('appAnimatedCounter') value: number;
  @Input() delay = 0;
  @Input() speed = DEFAULT_ANIMATION_SPEED;

  staticText: string;

  private startingValue = 0;
  private startingValueDecimal = 0;

  constructor(
    private readonly renderer: Renderer2,
    private readonly destroyed$: DestroyService,
    private readonly el: ElementRef<HTMLDivElement>,
  ) { }

  ngOnInit(): void {
    if (!!this.el.nativeElement.textContent) {
      this.staticText = this.el.nativeElement.textContent;
    }

    if (this.delay > 0) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.staticText);
    }

    timer(this.delay || 0)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        complete: () => this.animate()
      });
  }

  private get hasDecimals(): boolean {
    const decimalPortion = this.getDecimalValuePortion(1);
    return decimalPortion !== undefined ? true : false;
  }

  private getDecimalValuePortion(indexPosition): number {
    const decimal = this.value.toString().split('.')[indexPosition];
    return parseFloat(decimal);
  }

  private animate(): void {
    if (this.value && this.safeValidate(this.value)) {
      const start = () => {
        if (this.startingValue < this.value) {
          this.startingValue++;
          this.renderer.setProperty(this.el.nativeElement, 'textContent', `${this.startingValue}${this.staticText ? this.staticText : ''}`);
          setTimeout(start, this.speed);
        } else if (this.hasDecimals) {
          if (this.startingValueDecimal < this.getDecimalValuePortion(1)) {
            this.startingValueDecimal++;
            this.renderer.setProperty(this.el.nativeElement, 'textContent', `${this.getDecimalValuePortion(0)}.${this.startingValueDecimal}${this.staticText ? this.staticText : ''}`);
            setTimeout(start, this.speed);
          }
        }
      };

      start();
    }
  }

  private safeValidate(value): boolean {
    return typeof value === 'number';
  }
}
