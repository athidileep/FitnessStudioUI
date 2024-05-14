import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DataService, apiResultFormat, getactivitytracking, getactivitytype, getintensitylevel } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-activitytracking',
  templateUrl: './activitytracking.component.html',
  styleUrls: ['./activitytracking.component.scss']
})

export class ActivitytrackingComponent {
  public ActivityTableData: Array<getactivitytracking> = [];
  public activitytracking: Array<getactivitytracking> = [];
  public TempActivity: Array<getactivitytracking> = [];
  public ActivityType: Array<getactivitytype> = [];
  public IntensityLevel: Array<getintensitylevel> = [];
  dataSource!: MatTableDataSource<getactivitytracking>;
  public allData: apiResultFormat = null;
  public _allactivitytracking: Array<getactivitytracking> = [];
  public searchDataValue = '';
  public addactivityform: FormGroup;
  public editactivityform: FormGroup;
  public editformmodel: FormGroup;
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  editedIndex: number = -1;
  prevCode: "";
  prevName: "";
  ActivityTypeNames: any = "";
  intensityLevelNames: any = "";
  public responseText: string = "";
  public response: boolean = false;
  isTableEdit: boolean = false;
  public UserName: string = atob(localStorage.getItem('LoginData'));
  public SassId: number = parseInt(localStorage.getItem('SASSId'));
  public UserTypeId: number = parseInt(localStorage.getItem('iUserTypeID'));
  public UserId: number = parseInt(localStorage.getItem('UserId'));

  constructor(private formBuilder: NonNullableFormBuilder, private data: DataService, public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.addactivityform = this.formBuilder.group({
      Date: ["", [Validators.required]],
      ActivityTypeId: ["", [Validators.required]],
      ActivityTypeName: [""],
      ActivityName: ["", [Validators.required]],
      Duration: [""],
      Reps: [""],
      SetsInfo: [""],
      BodyWeight: ["", [Validators.required]],
      LiftWeight: [""],
      CaloriesBurned: [""],
      IntensityLevelId: [0, [Validators.required]],
      BodyFat: ["", [Validators.required]],
      MuscleMass: ["", [Validators.required]],
      IntensityLevelIdName: [""],
      Notes: [""],
      status: ["Active"],
      createdby: ["Admin"],
      createdat: [new Date()],
      UserId: [this.UserId],
      activityTotalData: [],
      ActivityTrackId: [0],
    });

    this.editformmodel = this.formBuilder.group({
      Date: [null, [Validators.required]],
      ActivityTypeId: ["", [Validators.required]],
      ActivityTypeName: [""],
      ActivityName: ["", [Validators.required]],
      Duration: ["", [Validators.required]],
      Reps: [""],
      Id: [0],
      SetsInfo: [""],
      BodyWeight: ["", [Validators.required]],
      BodyFat: ["", [Validators.required]],
      MuscleMass: ["", [Validators.required]],
      LiftWeight: [""],
      CaloriesBurned: [""],
      IntensityLevelId: ["", [Validators.required]],
      IntensityLevelIdName: [""],
      Notes: [""],
      Status: ["Active"],
      CreatedBy: ["Admin"],
      CreatedAt: [new Date()],
      UserId: [this.UserId],
      ActivityTrackId: [0],
    });
    this.GetActivityTracking();
    this.getActivityType();
    this.getIntensityLevel();
    this.addactivityform.controls['ActivityName'].disable();
    this.addactivityform.controls['Date'].disable();
    this.editformmodel.controls['Date'].disable();
  }

  onSubmit() {
    this.addactivityform.controls['activityTotalData'].setValue(this.ActivityTableData);
    this.data.InsertActivityTracking(this.addactivityform.getRawValue())
      .subscribe((response: any) => {
        if (response.success == false) {
          this.response = false;
          this.responseText = response.error.message;
        }
        else {
          this.GetActivityTracking();
          document.getElementById("modalclose").click();
        }
        this.searchDataValue = "";
      });
  }
  onEditSubmit() {
    this.responseText = "";
    console.log(this.editformmodel.value)
    this.data.UpdateActivityTracking(this.editformmodel.getRawValue())
      .subscribe((response: any) => {
        if (response.success == false) {
          this.response = false;
          this.responseText = response.error.message;
        }
        else {
          this.GetActivityTracking();
          document.getElementById("modalclose2").click();
        }
        this.searchDataValue = "";
      });
  }
  updateTypes(Idx: any) {
    console.log(Idx);
    console.log(this.ActivityType);
    if (parseInt(Idx)) {
      const ActivityTypeName = this.ActivityType.filter(t => t.Id == Idx)[0].ActivityName;
      this.ActivityTypeNames = ActivityTypeName;
    }
  }
  onIntensityTypeChange(Idx: any) {
    if (parseInt(Idx)) {
      const IntesityLevel = this.IntensityLevel.filter(t => t.Id == Idx)[0].IntensityName;
      this.intensityLevelNames = IntesityLevel;
    }
  }   
  GetActivityTracking() {
    this.responseText = "";
    this.data.getActivityTrack(this.UserId).subscribe((res: apiResultFormat) => {
      this.allData = res;
      this.SetTableData();
    });
  }
  SetTableData(): void {
    this.activitytracking = [];
    this.serialNumberArray = [];
    this.totalData = this.allData.totalData;
    this._allactivitytracking = [];
    this.allData.data.map((res: getactivitytracking, index: number) => {
      this._allactivitytracking.push(res);
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.activitytracking.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<getactivitytracking>(this._allactivitytracking);
    this.calculateTotalPages(this.totalData, this.pageSize);
  } 
  isTableEdited(index: number) {
    return this.editedIndex === index;
  }
  togglsaveMode(obj: any) {
    this.editedIndex = -1;
    this.isTableEdit = false; 
    obj.isediting = false;
    if (obj.ActivityTypeName !== this.prevCode || obj.ActivityName !== this.prevName) { obj.isedited = 1 }
    else { obj.isedited = 0 }
  }
  getActivityType() {
    this.data.getActivityType().subscribe((res: apiResultFormat) => {
      res.data.map((res: getactivitytype, index: number) => {
        this.ActivityType.push(res);
      });
      // this.ActivityType = this.ActivityType.reverse();
    });
  }
  getIntensityLevel() {
    this.data.getIntensitylevel().subscribe((res: apiResultFormat) => {
      res.data.map((res: getintensitylevel, index: number) => {
        this.IntensityLevel.push(res);
      });
      this.IntensityLevel = this.IntensityLevel.reverse();
    });
  }
  onTypeChange(Idx: any) {
    if (Idx > 0) {
      this.addactivityform.controls['ActivityName'].enable();
    }
  }

  AddActivityTracking() {
    this.responseText = "";
    this.ActivityTableData = [];
    this.addactivityform.reset();
    this.addactivityform.controls['ActivityName'].disable();
    this.addactivityform.controls["Date"].setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));

  }
  editActivityTracking(Id: any, Idx: any) {
    this.editformmodel.setValue(this.activitytracking[Idx]);
    this.editformmodel.controls["Date"].setValue(formatDate(this.activitytracking[Idx].Date, 'yyyy-MM-dd', 'en'));
  }
  isNullOrWhitespace(input: string | null | undefined): boolean {
    return input == null || input == undefined || input.trim() == '';
  }
  addToActivityTable() {
    const Name = this.addactivityform.get('ActivityName').value;
    const Type = this.addactivityform.get('ActivityTypeId').value;
    let Duration = this.addactivityform.get('Duration').value;
    let Reps = this.addactivityform.get('Reps').value;
    let Sets = this.addactivityform.get('SetsInfo').value;
    let Weight = this.addactivityform.get('LiftWeight').value;
    let CaloriesBurned = this.addactivityform.get('CaloriesBurned').value;
    let IntensityLevel = this.addactivityform.get('IntensityLevelId').value;
    const Notes = this.addactivityform.get('Notes').value;

    if (typeof Reps === 'string' && Reps.trim() === '') {
      Reps = 0;
    }
    if (typeof Sets === 'string' && Sets.trim() === '') {
      Sets = 0;
    }
    if (typeof Weight === 'string' && Weight.trim() === '') {
      Weight = 0;
    }
    if (typeof CaloriesBurned === 'string' && CaloriesBurned.trim() === '') {
      CaloriesBurned = 0;
    }
    if (typeof IntensityLevel === 'string' && IntensityLevel.trim() === '') {
      IntensityLevel = 0;
    }

    if (!this.isNullOrWhitespace(Name)) {
      this.ActivityTableData.push({
        id: 0,
        Date: undefined,
        ActivityTypeId: Type,
        ActivityName: Name,
        Duration: Duration,
        Reps: Reps,
        SetsInfo: Sets,
        BodyWeight: 0,
        CaloriesBurned: CaloriesBurned,
        IntensityLevelId: IntensityLevel,
        Notes: Notes,
        createdat: undefined,
        createdby: undefined,
        isediting: false,
        ActivityTypeName: this.ActivityTypeNames,
        IntensityLevelIdName: this.intensityLevelNames,
        LiftWeight: Weight,
        BodyFat: 0,
        MuscleMass: 0
      });
    } else {
      this.response = false;
      this.responseText = "Received Invalid/Empty value for ActivityTracking ";
    }

    this.ResetValues();
    if (this.ActivityTableData.length > 0) {
      this.Removevalidation();
    }
    else {
      this.SetValidation()
    }
  }

  ResetValues() {
    this.addactivityform.get('ActivityName').reset();
    this.addactivityform.get('ActivityTypeId').reset();
    this.addactivityform.get('Duration').reset();
    this.addactivityform.get('Reps').reset();
    this.addactivityform.get('SetsInfo').reset();
    this.addactivityform.get('LiftWeight').reset();
    this.addactivityform.get('CaloriesBurned').reset();
    this.addactivityform.get('IntensityLevelId').reset();
    this.addactivityform.get('Notes').reset();
  }


  ToggleeEditMode(obj: any, Id): void {
    this.ResetValues();
    this.editedIndex = this.ActivityTableData.indexOf(obj);
    this.prevCode = obj.code;
    this.prevName = obj.name;
    
    obj.isediting = true;
    this.ActivityTableData.forEach(record => { 
      if (record !== obj) {
        record.isediting = false;
      }
    });

    // Update Activity Type and Intensity Level with their current values
    obj.ActivityTypeName = obj.ActivityType;
    obj.IntensityLevelIdName = obj.IntensityLevel;

    this.isTableEdit = true;
}

  updateName(obj: any, event: any) {
    obj.ActivityName = event.target.value;
  }
  updateType(obj: any, event: any) {
    obj.ActivityTypeName = event.target.value;
}

  updateDuration(obj: any, event: any) {
    obj.Duration = event.target.value;
  }
  updateReps(obj: any, event: any) {
    obj.Reps = event.target.value;
  }
  updateSets(obj: any, event: any) {
    obj.SetsInfo = event.target.value;
  }
  updateIntensity(obj: any, event: any) {
    obj.IntensityLevel = this.intensityLevelNames;
  }
  updateWeight(obj: any, event: any) {
    obj.LiftWeight = event.target.value;
  }
  updateCalories(obj: any, event: any) {
    obj.CaloriesBurned = event.target.value;
  }
  updateNotes(obj: any, event: any) {
    obj.Notes = event.target.value;
  }
  updateLevel(obj: any, event: any) {
    obj.IntensityLevel = event.target.value;
  }
  ToggleeDeleteMode(Idx: any) {
    this.ActivityTableData.splice(Idx, 1);
  } 
  Removevalidation() {
    this.addactivityform.controls["ActivityTypeId"].clearValidators();
    this.addactivityform.controls["ActivityName"].clearValidators();
    this.addactivityform.controls["IntensityLevelId"].clearValidators();
    this.addactivityform.controls["IntensityLevelId"].updateValueAndValidity();
    this.addactivityform.controls["ActivityTypeId"].updateValueAndValidity();
    this.addactivityform.controls["ActivityName"].updateValueAndValidity();
  }
  SetValidation() {
    this.addactivityform.controls['ActivityTypeId'].setValidators(Validators.required);
    this.addactivityform.controls['ActivityTypeId'].updateValueAndValidity();
    this.addactivityform.controls['ActivityName'].setValidators(Validators.required);
    this.addactivityform.controls['ActivityName'].updateValueAndValidity();
    this.addactivityform.controls['IntensityLevelId'].updateValueAndValidity();
    this.addactivityform.controls['IntensityLevelId'].setValidators(Validators.required);
  }
  public sortData(sort: Sort) {
    const data = this.activitytracking.slice();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.activitytracking = data;
    } else {
      this.activitytracking = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string, type: string = ""): void {
    if (value.length >= 1) {
      this.dataSource.filter = value.trim().toLowerCase();
      this.activitytracking = this.dataSource.filteredData;
    }
    else {
    }
    this.totalData = this.activitytracking.length;
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.SetTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.SetTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.SetTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.SetTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}