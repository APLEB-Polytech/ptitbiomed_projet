import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddArticleToMediaDialogComponent} from './add-article-to-media-dialog.component';

describe('AddArticleToMediaDialogComponent', () => {
  let component: AddArticleToMediaDialogComponent;
  let fixture: ComponentFixture<AddArticleToMediaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddArticleToMediaDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddArticleToMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
