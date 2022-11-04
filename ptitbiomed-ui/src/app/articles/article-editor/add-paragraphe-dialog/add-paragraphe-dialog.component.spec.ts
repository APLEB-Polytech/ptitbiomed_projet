import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddParagrapheDialogComponent} from './add-paragraphe-dialog.component';

describe('AddParagrapheDialogComponent', () => {
  let component: AddParagrapheDialogComponent;
  let fixture: ComponentFixture<AddParagrapheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddParagrapheDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddParagrapheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
