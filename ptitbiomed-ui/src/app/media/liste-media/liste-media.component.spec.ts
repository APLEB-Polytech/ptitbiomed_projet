import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeMediaComponent} from './liste-media.component';

describe('ListeMediaComponent', () => {
  let component: ListeMediaComponent;
  let fixture: ComponentFixture<ListeMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeMediaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
