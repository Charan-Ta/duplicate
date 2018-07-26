import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnciliaryElementsComponent } from './anciliary-elements.component';

describe('AnciliaryElementsComponent', () => {
  let component: AnciliaryElementsComponent;
  let fixture: ComponentFixture<AnciliaryElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnciliaryElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnciliaryElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
