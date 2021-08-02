import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  private readonly canGoBack: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }

  goBack(): void {
    if (this.canGoBack) {
      this.location.back();
    } else {
      this.router.navigate(['/home'], { relativeTo: this.route });
    }
  }
}
