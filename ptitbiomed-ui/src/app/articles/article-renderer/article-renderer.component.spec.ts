import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRendererComponent } from './article-renderer.component';

describe('ArticleRendererComponent', () => {
  let component: ArticleRendererComponent;
  let fixture: ComponentFixture<ArticleRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
