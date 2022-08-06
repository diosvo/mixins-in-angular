import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedCachingComponent } from './advanced-caching.component';

describe('AdvancedCachingComponent', () => {
  let component: AdvancedCachingComponent;
  let fixture: ComponentFixture<AdvancedCachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdvancedCachingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedCachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
