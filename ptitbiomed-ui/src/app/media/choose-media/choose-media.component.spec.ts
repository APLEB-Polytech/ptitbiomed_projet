import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseMediaComponent} from './choose-media.component';

describe('ChooseMediaComponent', () => {
  let component: ChooseMediaComponent;
  let fixture: ComponentFixture<ChooseMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseMediaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChooseMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
