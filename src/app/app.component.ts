import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';
import { IMenu } from './home/models/search.model';
import { EMenuLink, EUrl } from './home/models/url.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  menuList: Array<IMenu> = [
    {
      name: EMenuLink.COMPONENT,
      route: EUrl.COMPONENT,
      active: true
    },
    {
      name: EMenuLink.WEB,
      route: EUrl.WEB,
      active: false
    },
    {
      name: EMenuLink.FUNCTION,
      route: EUrl.FUNCTION,
      active: false
    }
  ];

  constructor(
    public router: Router,
    private titleService: Title,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data.title) {
              return child.snapshot.data.title;
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe({
        next: (data: any) => data ? this.titleService.setTitle(data) : null
      });
  }

  onDirect(route: string): void {
    this.menuList = this.menuList.map(item => ({ ...item, active: item.route === route ? true : false }));
    this.router.navigate([route]);
  }
}
