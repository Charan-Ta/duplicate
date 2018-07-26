import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MechandiseNavbarComponent } from './mechandise-navbar.component';

describe('MechandiseNavbarComponent', () => {
  let component: MechandiseNavbarComponent;
  let fixture: ComponentFixture<MechandiseNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MechandiseNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MechandiseNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
