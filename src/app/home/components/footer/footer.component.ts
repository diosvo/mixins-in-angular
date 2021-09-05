import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [`
    .footer-img {
      width: 50px;
      height: 50px;
    }

    .footer-img img {
      margin-top: 2px;
    }
  `]
})
export class FooterComponent { }
