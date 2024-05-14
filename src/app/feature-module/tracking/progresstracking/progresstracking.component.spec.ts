import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresstrackingComponent } from './progresstracking.component';

describe('ProgresstrackingComponent', () => {
  let component: ProgresstrackingComponent;
  let fixture: ComponentFixture<ProgresstrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgresstrackingComponent]
    });
    fixture = TestBed.createComponent(ProgresstrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
