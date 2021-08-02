import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackButtonComponent } from './back-button.component';

class RouterStub {
  getCurrentNavigation(): object {
    return {
      previousNavigation: {}
    };
  }
}

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackButtonComponent],
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule
      ],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useClass: RouterStub
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    component['canGoBack' as any] = true;
    fixture.detectChanges();
  });

  beforeAll(async () => {
    await TestBed.resetTestEnvironment();
    await TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
