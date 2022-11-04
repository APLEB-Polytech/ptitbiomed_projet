import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPDFDialogComponent} from './add-pdfdialog.component';

describe('AddPDFDialogComponent', () => {
  let component: AddPDFDialogComponent;
  let fixture: ComponentFixture<AddPDFDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPDFDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPDFDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
