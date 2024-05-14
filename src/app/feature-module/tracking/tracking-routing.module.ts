import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingComponent } from './tracking.component'; 
import { ActivitytrackingComponent } from './activitytracking/activitytracking.component';
import { GoalsettingComponent } from './goalsetting/goalsetting.component';
import { ProgresstrackingComponent } from './progresstracking/progresstracking.component';
import { ProfilecreationComponent } from './profilecreation/profilecreation.component';

const routes: Routes = [
  { 
    path: '', 
    component: TrackingComponent ,
    children: [
      { path: "activity-tracking", component: ActivitytrackingComponent }, 
      { path: "goal-setting", component: GoalsettingComponent }, 
      { path: "progress-tracking", component: ProgresstrackingComponent }, 
      { path: "create-profile", component: ProfilecreationComponent }, 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
