import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureElementsComponent } from './fixture-elements.component';

describe('FixtureElementsComponent', () => {
  let component: FixtureElementsComponent;
  let fixture: ComponentFixture<FixtureElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
