import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedResultsComponent } from './saved-results.component';

describe('SavedResultsComponent', () => {
  let component: SavedResultsComponent;
  let fixture: ComponentFixture<SavedResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
