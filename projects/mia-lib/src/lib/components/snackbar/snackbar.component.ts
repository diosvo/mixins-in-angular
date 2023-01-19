import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  standalone: true,
  imports: [CustomButtonComponent],
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent {

  constructor(
    readonly snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) readonly data: string
  ) { }
}
