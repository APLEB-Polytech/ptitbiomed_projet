import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeUtilisateursComponent} from './liste-utilisateurs.component';

describe('ListeUtilisateursComponent', () => {
  let component: ListeUtilisateursComponent;
  let fixture: ComponentFixture<ListeUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeUtilisateursComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
