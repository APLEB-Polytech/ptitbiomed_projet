import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleListDialogComponent} from './article-list-dialog.component';

describe('ArticleListDialogComponent', () => {
  let component: ArticleListDialogComponent;
  let fixture: ComponentFixture<ArticleListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleListDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArticleListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
