import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDElementsComponent } from './three-d-elements.component';

describe('ThreeDElementsComponent', () => {
  let component: ThreeDElementsComponent;
  let fixture: ComponentFixture<ThreeDElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
