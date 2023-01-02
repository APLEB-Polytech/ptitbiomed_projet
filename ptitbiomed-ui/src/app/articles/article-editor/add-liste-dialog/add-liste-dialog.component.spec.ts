import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddListeDialogComponent} from './add-liste-dialog.component';

describe('AddListeDialogComponent', () => {
  let component: AddListeDialogComponent;
  let fixture: ComponentFixture<AddListeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddListeDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddListeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
