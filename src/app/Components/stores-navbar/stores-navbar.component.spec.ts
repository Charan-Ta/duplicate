import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresNavbarComponent } from './stores-navbar.component';

describe('StoresNavbarComponent', () => {
  let component: StoresNavbarComponent;
  let fixture: ComponentFixture<StoresNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
