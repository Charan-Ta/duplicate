import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxNavbarComponent } from './inbox-navbar.component';

describe('InboxNavbarComponent', () => {
  let component: InboxNavbarComponent;
  let fixture: ComponentFixture<InboxNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
