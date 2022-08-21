import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeArticlesComponent } from './liste-articles.component';

describe('ListeArticlesComponent', () => {
  let component: ListeArticlesComponent;
  let fixture: ComponentFixture<ListeArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
