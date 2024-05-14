import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { ActivitytrackingComponent } from './activitytracking/activitytracking.component';
import { GoalsettingComponent } from './goalsetting/goalsetting.component';
import { ProgresstrackingComponent } from './progresstracking/progresstracking.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilecreationComponent } from './profilecreation/profilecreation.component';


@NgModule({
  declarations: [
    TrackingComponent,
    ActivitytrackingComponent,
    GoalsettingComponent,
    ProgresstrackingComponent,
    ProfilecreationComponent
  ],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    SharedModule
  ]
})
export class TrackingModule { }
