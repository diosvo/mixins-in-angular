import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticlePageStateComponent } from './view-article-page-state.component';

describe('ViewArticlePageStateComponent', () => {
  let component: ViewArticlePageStateComponent;
  let fixture: ComponentFixture<ViewArticlePageStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArticlePageStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArticlePageStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
