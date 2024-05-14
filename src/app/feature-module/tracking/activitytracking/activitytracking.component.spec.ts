import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytrackingComponent } from './activitytracking.component';

describe('ActivitytrackingComponent', () => {
  let component: ActivitytrackingComponent;
  let fixture: ComponentFixture<ActivitytrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitytrackingComponent]
    });
    fixture = TestBed.createComponent(ActivitytrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
