import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/services/auth.service';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { ToolbarModule } from '@home/components/toolbar/toolbar.module';
import { FooterModule } from '@home/components/footer/footer.module';

class MockRouter {
  public navigate = new NavigationEnd(0, 'http://localhost:4200/ui-components', 'http://localhost:4200/ui-components');
  public events = new Observable(observer => {
    observer.next(this.navigate);
    observer.complete();
  });
}

const titleService = {
  setTitle: jest.fn().mockReturnValue('App')
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FooterModule,
        ToolbarModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: Title,
          useValue: titleService
        },
        {
          provide: AuthService,
          useValue: {}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: null,
            outlet: 'primary',
            data: jest.fn().mockReturnValue(of({ title: 'App', toolbar: true, footer: true }))
          }
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  test('should create the app', (() => {
    expect(component).toBeTruthy();
  }));
});
