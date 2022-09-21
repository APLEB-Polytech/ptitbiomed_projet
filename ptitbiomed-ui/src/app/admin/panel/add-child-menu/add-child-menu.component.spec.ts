import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddChildMenuComponent} from './add-child-menu.component';

describe('AddChildMenuComponent', () => {
  let component: AddChildMenuComponent;
  let fixture: ComponentFixture<AddChildMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChildMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddChildMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
