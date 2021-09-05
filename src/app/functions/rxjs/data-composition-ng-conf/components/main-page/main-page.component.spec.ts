import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ContentComponent } from '../content/content.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        SidebarComponent,
        ContentComponent
      ],
      imports: [
        AlertModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
