import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DataService, apiResultFormat, getgendertype, getlocationcountry, getlocationstate, getmaritalstatus, getuserprofile } from 'src/app/core/core.index';

@Component({
  selector: 'app-profilecreation',
  templateUrl: './profilecreation.component.html',
  styleUrls: ['./profilecreation.component.scss']
})
export class ProfilecreationComponent {

  public UserProfile: Array<getuserprofile> = [];
  public LocationCountry: Array<getlocationcountry> = [];
  public LocationState: Array<getlocationstate> = [];
  public MaritalStatus: Array<getmaritalstatus> = [];
  public GenderType: Array<getgendertype> = [];
  public addProfileform: FormGroup;
  public Anniversary: Boolean = false;
  public Isedit: Boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  public UserId: string = atob(localStorage.getItem('LoginData'));
  public SassId: number = parseInt(localStorage.getItem('SASSId'));
  public UserTypeId: number = parseInt(localStorage.getItem('iUserTypeID'));
  public responseText: string = "";
  public response: boolean = false;
  selectedValue: boolean | null = null;
  datePipe: any;

  constructor(private formBuilder: NonNullableFormBuilder, private data: DataService) { }

  ngOnInit(): void {

    this.addProfileform = this.formBuilder.group({
      FirstNames: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      DateOfBirth: ["", [Validators.required]],
      GenderId: ["", [Validators.required]],
      GenderName: [""],
      Height: ["", [Validators.required]],
      Weight: ["", [Validators.required]],
      MaritalStatusId: ["", [Validators.required]],
      MaritalStatusName: [""],
      AnniversaryDate: [""],
      MemberFrom: ["", [Validators.required]],
      MemberTo: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      ContactNumber: ["", [Validators.required]],
      EmergencyContactNumber: [""],
      EmergencyContactPerson: [""],
      Address: ["", [Validators.required]],
      LocationState: ["", [Validators.required]],
      LocationStateName: [""],
      LocationCountry: ["", [Validators.required]],
      LocationCountryName: [""],
      MedicationDetails: [""],
      Medications: ["", [Validators.required]],
      MedicalCondition: ["", [Validators.required]],
      MedicalConditionDetails: [""],
      Id: [0],
      Status: ["Active"],
      SASSId: [""],
      UserType: [""],
      UserName: [""]
    });

    this.GetProfileCreation();
    this.getLocationCountry();
    this.getLocationState();
    this.getGenderType();
    this.getMaritalStatus();

  }

  onSubmit() {
    this.SetFormValue();
    this.data.UpdateUserProfile(this.addProfileform.getRawValue())
      .subscribe((response: any) => {
        if (response.success == false) {
          this.response = false;
          this.responseText = response.error.message;
        }
        else {
          this.addProfileform.reset();
          this.GetProfileCreation();
          window.location.reload();  /* reload page */
        }
      });
  }
  SetFormValue(): void {
    this.addProfileform.controls['SASSId'].setValue(this.SassId);
    this.addProfileform.controls['UserType'].setValue(this.UserTypeId);
    this.addProfileform.controls['UserName'].setValue(this.UserId);
    const medicalConditionValue = this.addProfileform.get('MedicalCondition')?.value;
    const medicationValue = this.addProfileform.get('Medications')?.value;
    this.addProfileform.controls['MedicalCondition'].setValue(medicalConditionValue);
    this.addProfileform.controls['Medications'].setValue(medicationValue);

    const EmergencyContact = this.addProfileform.get('EmergencyContactNumber')?.value;
    const AnniversaryDate = this.addProfileform.get('AnniversaryDate')?.value;
    console.log(AnniversaryDate)
    if (EmergencyContact.length == 0) {
      this.addProfileform.controls['EmergencyContactNumber'].setValue(0);
    };
    if (AnniversaryDate.length == 0) {
      this.addProfileform.controls['AnniversaryDate'].setValue(null);
    };
  }
  getLocationCountry() {
    this.data.getCountry().subscribe((res: apiResultFormat) => {
      res.data.map((res: getlocationcountry, index: number) => {
        this.LocationCountry.push(res);
      });
      this.LocationCountry = this.LocationCountry.reverse();
    });
  }
  getLocationState() {
    this.data.getState().subscribe((res: apiResultFormat) => {
      res.data.map((res: getlocationstate, index: number) => {
        this.LocationState.push(res);
      });
      this.LocationState = this.LocationState.reverse();
    });
  }
  getGenderType() {
    this.data.getGender().subscribe((res: apiResultFormat) => {
      res.data.map((res: getgendertype, index: number) => {
        this.GenderType.push(res);
      });
      this.GenderType = this.GenderType.reverse();
    });
  }
  getMaritalStatus() {
    this.data.getMaritalstatus().subscribe((res: apiResultFormat) => {
      res.data.map((res: getmaritalstatus, index: number) => {
        this.MaritalStatus.push(res);
      });
      this.MaritalStatus = this.MaritalStatus.reverse();
    });
  }
  GetProfileCreation() {
    this.InputDisabled();
    this.responseText = "";
    this.Isedit = false;
    const UserId = this.UserId; /*Decoding From Base64*/
    this.data.getUserProfile(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: getuserprofile, index: number) => {
        this.UserProfile.push(res);
      });
      this.SetValue();
    });
  }
  editProfile() {
    this.EnableInput();
    this.Isedit = true;
    this.MedicalInfo()
    this.addProfileform.controls['MemberFrom'].disable();
    this.addProfileform.controls['MemberTo'].disable();
  }
  MedicalInfo(): void {
    const Medicalconditon = this.addProfileform.controls['MedicalCondition'].value;
    const MedicalconditonDetails = this.addProfileform.controls['MedicalConditionDetails'].value;
    const Medicaiton = this.addProfileform.controls['Medications'].value;
    const MedicaitonDetails = this.addProfileform.controls['MedicationDetails'].value;

    if (Medicalconditon == true) {
      this.addProfileform.controls['MedicalConditionDetails'].enable();
    }
    if (Medicalconditon == false) {
      this.addProfileform.controls['MedicalConditionDetails'].disable();
    }
    if (Medicaiton == true) {
      this.addProfileform.controls['MedicationDetails'].enable();
    }
    if (Medicaiton == false) {
      this.addProfileform.controls['MedicationDetails'].disable();
    }
  }
  onMedicationChange(Bool) {
    const Medicaiton = this.addProfileform.controls['Medications'].value;
    const MedicaitonDetails = this.addProfileform.controls['MedicationDetails'];
    if (Medicaiton === true) {
      MedicaitonDetails.enable();
    }
    else {
      MedicaitonDetails.disable();
    }
  }
  onMedicalChange(Bool) {
    const Medicalconditon = this.addProfileform.controls['MedicalCondition'].value;
    const MedicalconditonDetails = this.addProfileform.controls['MedicalConditionDetails'];
    if (Medicalconditon === true) {
      MedicalconditonDetails.enable();
    }
    else {
      MedicalconditonDetails.disable();
    }
  }
  SetValue() {
    this.InputDisabled();
    this.addProfileform.setValue(this.UserProfile[0]);
    this.addProfileform.controls["MemberFrom"].setValue(formatDate(this.UserProfile[0].MemberFrom, 'yyyy-MM-dd', 'en'));
    this.addProfileform.controls["MemberTo"].setValue(formatDate(this.UserProfile[0].MemberTo, 'yyyy-MM-dd', 'en'));
    this.addProfileform.controls["DateOfBirth"].setValue(formatDate(this.UserProfile[0].DateOfBirth, 'yyyy-MM-dd', 'en'));

    const Anniversarydate = this.UserProfile[0].AnniversaryDate; 
    if (Anniversarydate === null) {
      this.addProfileform.controls["AnniversaryDate"].reset();
    }
    else {
      this.addProfileform.controls["AnniversaryDate"].setValue(formatDate(this.UserProfile[0].AnniversaryDate, 'yyyy-MM-dd', 'en'));
    }
  }
  InputDisabled() {
    this.addProfileform.controls['FirstNames'].disable();
    this.addProfileform.controls['LastName'].disable();
    this.addProfileform.controls['DateOfBirth'].disable();
    this.addProfileform.controls['GenderId'].disable();
    this.addProfileform.controls['Height'].disable();
    this.addProfileform.controls['Weight'].disable();
    this.addProfileform.controls['MaritalStatusId'].disable();
    this.addProfileform.controls['AnniversaryDate'].disable();
    this.addProfileform.controls['Email'].disable();
    this.addProfileform.controls['Address'].disable();
    this.addProfileform.controls['LocationState'].disable();
    this.addProfileform.controls['LocationCountry'].disable();
    this.addProfileform.controls['ContactNumber'].disable();
    this.addProfileform.controls['EmergencyContactNumber'].disable();
    this.addProfileform.controls['EmergencyContactPerson'].disable();
    this.addProfileform.controls['Medications'].disable();
    this.addProfileform.controls['MedicalCondition'].disable();
    this.addProfileform.controls['MemberFrom'].disable();
    this.addProfileform.controls['MemberTo'].disable();
    this.addProfileform.controls['MedicationDetails'].disable();
    this.addProfileform.controls['MedicalConditionDetails'].disable();
  }
  EnableInput() {
    this.addProfileform.controls['FirstNames'].enable();
    this.addProfileform.controls['LastName'].enable();
    this.addProfileform.controls['DateOfBirth'].enable();
    this.addProfileform.controls['GenderId'].enable();
    this.addProfileform.controls['Height'].enable();
    this.addProfileform.controls['Weight'].enable();
    this.addProfileform.controls['MaritalStatusId'].enable();
    this.addProfileform.controls['AnniversaryDate'].enable();
    this.addProfileform.controls['Email'].enable();
    this.addProfileform.controls['Address'].enable();
    this.addProfileform.controls['LocationState'].enable();
    this.addProfileform.controls['LocationCountry'].enable();
    this.addProfileform.controls['ContactNumber'].enable();
    this.addProfileform.controls['EmergencyContactNumber'].enable();
    this.addProfileform.controls['EmergencyContactPerson'].enable();
    this.addProfileform.controls['Medications'].enable();
    this.addProfileform.controls['MedicalCondition'].enable();
    this.addProfileform.controls['MemberFrom'].enable();
    this.addProfileform.controls['MemberTo'].enable();
    this.addProfileform.controls['MedicationDetails'].enable();
    this.addProfileform.controls['MedicalConditionDetails'].enable();
  }
  SpanAnniversary(status: any) {
    if (status === 2) {
      this.Anniversary = true;
    } else {
      this.Anniversary = false;
      this.addProfileform.controls['AnniversaryDate'].setValue(null);
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // Here you can emit an event or perform other actions with the image data
      };
      reader.readAsDataURL(file);
    }
  }

}
