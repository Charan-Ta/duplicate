import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedActionsComponent } from './completed-actions.component';

describe('CompletedActionsComponent', () => {
  let component: CompletedActionsComponent;
  let fixture: ComponentFixture<CompletedActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
