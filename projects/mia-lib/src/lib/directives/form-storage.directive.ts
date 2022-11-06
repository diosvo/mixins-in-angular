import { Directive, HostListener, Input, OnInit, Self } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { StorageService } from '@lib/services/storage/storage.service';
import isEqual from 'lodash.isequal';
import { debounceTime, filter, fromEvent, merge, take, takeUntil } from 'rxjs';

type Strategy = 'change' | 'unload';

@Directive({
  selector: 'form[formGroup][name]',
  standalone: true
})
export class FormStorageDirective<T> implements OnInit {

  @Input() name: string; // should same as the routing path
  @Input() saveStrategy: Strategy = 'unload';
  @Input() debounceTime = 300; // apply for 'change' strategy

  constructor(
    private readonly destroy$: DestroyService,
    private readonly storage: StorageService<T>,
    @Self() private readonly container: ControlContainer,
  ) { }

  @HostListener('submit')
  onSubmit(): void {
    this.storage.removeItem(this.key);
  }

  private get key(): string {
    return `${this.name}-form`;
  }

  private get group(): AbstractControl {
    return this.container.control;
  }

  async ngOnInit(): Promise<void> {
    isEqual(this.saveStrategy, 'unload') ? this.unloadStrategy() : this.changeStrategy();

    const values = await this.storage.getItem(this.key);
    if (values) this.group.patchValue(values);

    console.log(this.group.value);

  }

  private changeStrategy(): void {
    this.group.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounceTime),
      )
      .subscribe({
        next: () => this.saveValue(this.group.value)
      });
  }

  private unloadStrategy(): void {
    merge(fromEvent(window, 'beforeunload'), this.destroy$)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.group.dirty),
        take(1)
      )
      .subscribe({
        next: () => this.saveValue(this.group.value)
      });
  }

  private saveValue(value: T): void {
    this.storage.setItem(this.key, value);
  }
}
