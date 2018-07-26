import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActionsComponent } from './pending-actions.component';

describe('PendingActionsComponent', () => {
  let component: PendingActionsComponent;
  let fixture: ComponentFixture<PendingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
