import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingNotificationsComponent } from './pending-notifications.component';

describe('PendingNotificationsComponent', () => {
  let component: PendingNotificationsComponent;
  let fixture: ComponentFixture<PendingNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
