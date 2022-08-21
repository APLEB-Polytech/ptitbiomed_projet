import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelSubMenuComponent} from './panel-sub-menu.component';

describe('PanelSubMenuComponent', () => {
  let component: PanelSubMenuComponent;
  let fixture: ComponentFixture<PanelSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelSubMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
