import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDElementsComponent } from './two-d-elements.component';

describe('TwoDElementsComponent', () => {
  let component: TwoDElementsComponent;
  let fixture: ComponentFixture<TwoDElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
