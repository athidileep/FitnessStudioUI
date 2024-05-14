import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DataService, apiResultFormat, getcurrentprogress, gettargetprogress } from 'src/app/core/core.index';

@Component({
  selector: 'app-progresstracking',
  templateUrl: './progresstracking.component.html',
  styleUrls: ['./progresstracking.component.scss']
})
export class ProgresstrackingComponent {
  public Currentprogress: Array<getcurrentprogress> = [];
  public addProgressform: FormGroup;
  constructor(private formBuilder: NonNullableFormBuilder, private data: DataService) { }
  progresstracking: Array<gettargetprogress> = [];
  public UserId: number = parseInt(localStorage.getItem('UserId'));
  public ObjDate: any;
  public ObjWeight: any;
  public ObjBodyFat: any;
  public ObjMuscleMass: any;

  ngOnInit(): void {
    this.addProgressform = this.formBuilder.group({
      GoalTypeId: [""],
      GoalTypeIdName: [""],
      CurrentGoalType: [""],
      TargetWeight: [""],
      Weight: ["", [Validators.required]],
      TargetBodyFat: [""],
      BodyFat: ["", [Validators.required]],
      TargetMuscleMass: [""],
      MuscleMass: ["", [Validators.required]],
      TargetDate: [""],
      WorkoutDuration: [""],
      InfoDate: ["", [Validators.required]],
      UserId: [this.UserId],
      createdby: ["Admin"],
      createdat: [new Date()],
      status: ["Active"],
    });
    this.InputDisabled();
    this.GetCurrentProgress();
    this.GetTargetProgress();
  }
  onSubmit() { 
  }

  SetCurrentValue() {
    this.ObjDate = (formatDate(this.Currentprogress[0].InfoDate, 'yyyy-MM-dd', 'en'));
    this.ObjMuscleMass = (this.Currentprogress[0].MuscleMass);
    this.ObjWeight = (this.Currentprogress[0].Weight);
    this.ObjBodyFat = (this.Currentprogress[0].BodyFat);
  }
  InputDisabled() {
    this.addProgressform.controls['CurrentGoalType'].disable();
    this.addProgressform.controls['InfoDate'].disable();
    this.addProgressform.controls['MuscleMass'].disable();
    this.addProgressform.controls['Weight'].disable();
    this.addProgressform.controls['BodyFat'].disable();
    this.addProgressform.controls['WorkoutDuration'].disable();
  }
  GetCurrentProgress() { 
    const UserId = this.UserId;
    this.data.getCurrentProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: getcurrentprogress, index: number) => {
        this.Currentprogress.push(res);
        this.SetCurrentValue() 
      });
    });
  }
  GetTargetProgress() { 
    const UserId = this.UserId;
    this.data.getTargetProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: gettargetprogress, index: number) => {
        this.progresstracking.push(res); 
      });
    });
  }

}