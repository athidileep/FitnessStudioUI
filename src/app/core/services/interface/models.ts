import { NumberFormatStyle } from "@angular/common";

export interface apiResultFormat {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
  totalData: number;
}

export interface url {
  url: string;
}
export interface SideBarMenu {
  showMyTab?: boolean;
  menuValue: string;
  route?: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  icon: string;
  base: string;
  materialicons: string;
  subMenus: SubMenu[];
  dot?: boolean
  changeLogVersion?: boolean
}

export interface SubMenu {
  menuValue: string;
  route?: string;
  base: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  base7?: string;
  base8?: string;
  currentActive?: boolean;
  //sub: SubMenu[];
  //MultiMenus: MultiLevelMenu[];
}

export class MultiLevelMenu {
  Multimenu: SideBarMenu[];
  MultiSubmenu: SubMenu[];
}

export interface SideBar {
  showMyTab?: boolean;
  tittle: string;
  icon: string;
  showAsTab: boolean;
  separateRoute: boolean;
  materialicons?: string;
  menu: SideBarMenu[];
  visible: boolean;
}

export interface routerlink {
  id?: number;
  type?: number;
  url: string;
  urlAfterRedirects?: string;
}
export interface getusertype {
  Id: number;
  TypeCode: string;
  TypeName: string;
  UserName: string;
  UserId: number;
  CreatedBy: Date;
  CreatedAt: string;
  Status: string;
}
export interface getvalidateuser {
  SASSId: number;
  UserType: number;
  Password: string;
  UserName: string;
}

export interface getuserprofile {
  Id: Number;
  FirstNames: String;
  LastName: String;
  DateOfBirth: Date;
  GenderId: number;
  GenderName: string;
  MaritalStatusId: number;
  MaritalStatusName: string;
  AnniversaryDate: Date;
  Height: number;
  Weight: number;
  MemberFrom: Date;
  MemberTo: Date;
  Email: string;
  ContactNumber: number;
  EmergencyContactPerson: string;
  EmergencyContactNumber: number;
  Address: string;
  LocationState: number;
  LocationStateName: string;
  LocationCountry: number;
  LocationCountryName: string;
  MedicalContition: boolean;
  MedicalContitionDetails: string;
  Medications: boolean;
  MedicationDetails: string;
  Status: string;
}
export interface getlocationcountry {
  Id: number;
  CountryCode: String;
  CountryName: string;
  CreatedBy: string;
  CreatedAt: Date;
  Status: string;
}
export interface getlocationstate {
  Id: number;
  StateCode: String;
  LocationCountryId: number;
  StateName: string;
  CreatedBy: string;
  CreatedAt: Date;
  Status: string;
}
export interface getmaritalstatus {
  Id: number;
  Maritalcode: String;
  MaritalName: string;
  CreatedBy: string;
  CreatedAt: Date;
  Status: string;
}
export interface getgendertype {
  Id: number;
  GenderCode: String;
  GenderName: string;
  CreatedBy: string;
  CreatedAt: Date;
  Status: string;
}
export interface getactivitytype {
  Id: number;
  ActivityCode: String;
  ActivityName: string;
  CreatedBy: string;
  CreatedAt: Date;
  Status: string;
}
export interface getintensitylevel {
  Id: number;
  IntensityCode: String;
  IntensityName: string;
  CreatedBy: string;
  CreatedAt: Date;
  Status: string;
}
export interface getactivitytracking {
  id: number;
  Date: Date;
  ActivityTypeId: Number;
  ActivityTypeName: string;
  ActivityName: string;
  Duration: number;
  Reps: number;
  SetsInfo: number;
  BodyWeight: number;
  BodyFat: number;
  MuscleMass: number;
  LiftWeight: number;
  CaloriesBurned: number;
  IntensityLevelId: Number;
  IntensityLevelIdName: string;
  Notes: string;
  createdat: Date;
  createdby: string;
  isediting: boolean;
}
export interface gettargetprogress {
  id: number;
  GoalTypeName: string;
  GoalTypeId: number;
  UserId: number;
  TargetWeight: number;
  TargetBodyFat: number;
  TargetMuscleMass: number;
  WorkoutFrequency: string;
  TargetDate: Date;
  Status: string;
}
export interface getweightprogress {
  UserId: number;
  InfoDate: Date;
  Weight: number;
}
export interface getfatprogress {
  UserId: number;
  InfoDate: Date;
  BodyFat: number;
}
export interface getmusclemassprogress {
  UserId: number;
  InfoDate: Date;
  MuscleMass: number; 
} 
export interface getcurrentprogress {
  id: number;
  UserId: number;
  InfoDate: number;
  Weight: number;
  BodyFat: number;
  MuscleMass: number;
  Status: string;
  createdat: Date;
  createdby: string;
} 
export interface getgoalsetting {
  Id: number;
  UserId: number;
  GoalTypeId: number;
  GoalType: string;
  TargetWeight: number;
  TargetBodyFat: number;
  TargetMuscleMass: number;
  TargetDuration: number;
  WorkoutFrequency: number;
  TargetDate: Date;
  //WorkoutDuration: number;
  CreatedAt: Date;
  CreatedBy: string;
  ModifiedAt: Date;
  ModifiedBy: string;
  Status: string;
} 
export interface getgoaltype {
  id: number;
  name: string;
  code: string;
  type: string;
  createdat: Date;
  createdby: string;
  modifiedat: Date;
  modifiedby: string;
  status: string;
}
