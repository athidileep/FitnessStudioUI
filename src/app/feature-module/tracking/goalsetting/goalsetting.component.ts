import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators,ValidatorFn,AbstractControl  } from '@angular/forms';
import { DataService, getgoalsetting, apiResultFormat, getgoaltype } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-goalsetting',
  templateUrl: './goalsetting.component.html',
  styleUrls: ['./goalsetting.component.scss']
})
export class GoalsettingComponent {

  public goalsetting: Array<getgoalsetting> = [];
  dataSource!: MatTableDataSource<getgoalsetting>;
  public allData: apiResultFormat = null;
  public _allgoalsetting: Array<getgoalsetting> = [];
  public GetGoalType: Array<getgoaltype> = [];
  public searchDataValue = '';
  public addgoalform: FormGroup;
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


  public deleteID: number = -1;
  public deleteIDX: number = -1;
  public responseText: string = "";
  public response: boolean = false;

  public UserId: number = parseInt(localStorage.getItem('UserId'));

  constructor(private formBuilder: NonNullableFormBuilder, private data: DataService, public datepipe: DatePipe) { }

  ngOnInit(): void {


    this.addgoalform = this.formBuilder.group({
      Id: [0],
      GoalTypeId: ["", [Validators.required]],
      TargetWeight: ["", [Validators.required]],
      TargetBodyFat: [""],
      TargetMuscleMass: [""],
      TargetDuration: [""],
      WorkoutFrequency: [""],
      TargetDate: ["", [Validators.required, this.dateGreaterThanCurrent()]],
      Status: ["Active"],
      CreatedBy: ["Admin"],
      CreatedAt: [new Date()],
      ModifiedAt: [],
      ModifiedBy: [],
      UserId: [this.UserId],
      GoalType: [""]

    },
    // { validators:[this.dateGreaterThanCurrent]}
  );

    this.GetGoalSetting();
    this.getGoalType();
    console.log(this.addgoalform)
    this.addgoalform.patchValue({
      TargetDuration: 0, // Set default value for TargetDuration
      WorkoutFrequency: 0, // Set default value for WorkoutFrequency
      TargetDate: 0 // Set default value for TargetDate
    });
  }

  GetGoalSetting() { 
    this.data.getGoalSetting(this.UserId).subscribe((res: apiResultFormat) => {
      this.allData = res;
      this.SetTableData();
    });
  }

  getGoalType() {
    this.data.getGoalType().subscribe((res: apiResultFormat) => {
      res.data.map((res: getgoaltype, index: number) => {
        this.GetGoalType.push(res);
      });
      this.GetGoalType = this.GetGoalType.reverse();
    });
  }

  SetTableData(): void {
    this.goalsetting = [];
    this.serialNumberArray = [];
    this.totalData = this.allData.totalData;
    this._allgoalsetting = [];
    this.allData.data.map((res: getgoalsetting, index: number) => {
      this._allgoalsetting.push(res);
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.goalsetting.push(res);
        (this.goalsetting);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<getgoalsetting>(this._allgoalsetting);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

onSubmit(): void {
  console.log(this.addgoalform.get('WorkoutFrequency').value);
  const TargetBodyFatZ = this.addgoalform.get('TargetBodyFat').value;
  const TargetMuscleMassZ = this.addgoalform.get('TargetMuscleMass').value;
  const TargetDurationZ = this.addgoalform.get('TargetDuration').value;
  const WorkoutFrequencyZ = this.addgoalform.get('WorkoutFrequency').value;
  const Zerovalue = 0;

    if (this.addgoalform.get('Id').value == 0) {

      if (TargetBodyFatZ == "" || TargetBodyFatZ == null ) {
        this.addgoalform.controls['TargetBodyFat'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['TargetBodyFat'].setValue(TargetBodyFatZ)
      }

      if (TargetMuscleMassZ == "" || TargetMuscleMassZ == null ) {
        this.addgoalform.controls['TargetMuscleMass'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['TargetMuscleMass'].setValue(TargetMuscleMassZ)
      }

      if (TargetDurationZ == "" || TargetDurationZ == null ) {
        this.addgoalform.controls['TargetDuration'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['TargetDuration'].setValue(TargetDurationZ)
      }

      if (WorkoutFrequencyZ == "" || WorkoutFrequencyZ == null ) {
        this.addgoalform.controls['WorkoutFrequency'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['WorkoutFrequency'].setValue(WorkoutFrequencyZ)
      }
      
      this.data.InsertGoalSetting(this.addgoalform.getRawValue()).subscribe((response: any) => {
        if (response.status == false) {
          this.response = false;
          this.responseText = response.error.message;
        }
        else {
          this.GetGoalSetting();
          document.getElementById("modalclose").click();
        }
        this.searchDataValue = "";
      });
      console.log(this.addgoalform)
    }
    else {
      if (TargetBodyFatZ == "" || TargetBodyFatZ == null ) {
        this.addgoalform.controls['TargetBodyFat'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['TargetBodyFat'].setValue(TargetBodyFatZ)
      }

      if (TargetMuscleMassZ == "" || TargetMuscleMassZ == null ) {
        this.addgoalform.controls['TargetMuscleMass'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['TargetMuscleMass'].setValue(TargetMuscleMassZ)
      }

      if (TargetDurationZ == "" || TargetDurationZ == null ) {
        this.addgoalform.controls['TargetDuration'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['TargetDuration'].setValue(TargetDurationZ)
      }

      if (WorkoutFrequencyZ == "" || WorkoutFrequencyZ == null ) {
        this.addgoalform.controls['WorkoutFrequency'].setValue(Zerovalue)
      }
      else {
        this.addgoalform.controls['WorkoutFrequency'].setValue(WorkoutFrequencyZ)
      }

      this.data.UpdateGoalSetting(this.addgoalform.getRawValue()).subscribe((response: any) => {
        if (response.status == false) {
          this.response = false;
          this.responseText = response.error.message;
        }
        else {
          this.GetGoalSetting();
          document.getElementById("modalclose").click();
        }
        this.searchDataValue = "";
      });
      console.log(this.addgoalform)
    }
  }
  AddGoalSetting() {
    this.responseText = "";
    this.addgoalform.reset();
  }

  editGoalSetting(Idx: any) {
    this.addgoalform.setValue(this.goalsetting[Idx]);
    this.addgoalform.controls["TargetDate"].setValue(formatDate(this.goalsetting[Idx].TargetDate, 'yyyy-MM-dd', 'en'));

  }

  public sortData(sort: Sort) {
    const data = this.goalsetting.slice();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.goalsetting = data;
    } else {
      this.goalsetting = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string, type: string = ""): void {
    if (value.length >= 1) {
      this.dataSource.filter = value.trim().toLowerCase();
      this.goalsetting = this.dataSource.filteredData;
    }
    else {
      //this.GetGoalSetting();
    }
    this.totalData = this.goalsetting.length;
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
  dateGreaterThanCurrent(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
  
      if (selectedDate <= currentDate )  {
        return { dateNotGreaterThanCurrent: true };
      }
      
      return null;
    };
  }
  
}
export interface pageSelection {
  skip: number;
  limit: number;
}