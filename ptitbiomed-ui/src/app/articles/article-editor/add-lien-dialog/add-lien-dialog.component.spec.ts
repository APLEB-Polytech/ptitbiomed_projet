import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddLienDialogComponent} from './add-lien-dialog.component';

describe('AddLienDialogComponent', () => {
  let component: AddLienDialogComponent;
  let fixture: ComponentFixture<AddLienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLienDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddLienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
