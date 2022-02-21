import { ConnectionPositionPair, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { filter, fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy {

  @Input() appAutocomplete: AutocompleteComponent;

  private overlayRef: OverlayRef;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private readonly overlay: Overlay,
    private readonly ngControl: NgControl,
    private readonly containerRef: ViewContainerRef,
    private readonly host: ElementRef<HTMLInputElement>,
  ) { }

  private get control(): AbstractControl {
    return this.ngControl.control;
  }

  private get origin(): HTMLInputElement {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    fromEvent(this.origin, 'focus')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.openDropdown();

        this.appAutocomplete.optionsClick()
          .pipe(takeUntil(this.overlayRef.detachments()))
          .subscribe((value: string) => {
            this.control.setValue(value);
            this.closeDropdown();
          });
      });
  }

  private openDropdown(): void {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.appAutocomplete.rootTemplate, this.containerRef);
    this.overlayRef.attach(template);

    this.overlayClickOutside(this.overlayRef, this.origin).subscribe(
      () => this.closeDropdown()
    );
  }

  private getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  private overlayClickOutside(overlayRef: OverlayRef, origin: HTMLInputElement): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event: MouseEvent) => {
          const target = event.target as HTMLElement;
          const notOrigin = target !== origin;
          const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(target) === false); // isn't the dropdown or any one of its children
          return notOrigin && notOverlay;
        }),
        takeUntil(overlayRef.detachments())
      );
  }

  private closeDropdown(): void {
    this.overlayRef?.detach();
    this.overlayRef = null;
  }

  ngOnDestroy(): void {
    this.closeDropdown();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
