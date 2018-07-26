import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstoresComponent } from './allstores.component';

describe('AllstoresComponent', () => {
  let component: AllstoresComponent;
  let fixture: ComponentFixture<AllstoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllstoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
