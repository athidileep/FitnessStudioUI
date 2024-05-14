import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService, apiResultFormat, getusertype, getvalidateuser, routes } from 'src/app/core/core.index';
import { WebStorage } from 'src/app/core/services/storage/web.storage';

interface returndata {
  message: string | null;
  status: string | null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public routes = routes;
  public CustomControler!: string | number | returndata;
  public subscription: Subscription;
  public Toggledata = true;

  public UserType: Array<getusertype> = [];
  public responseText: string = "";
  public response: boolean = false;
  public sassid: any = 1;
  public iUserTypeId: any = 0;
  public BasePassword: any;


  form = new UntypedFormGroup({
    UserName: new UntypedFormControl('', [Validators.required]),
    Password: new UntypedFormControl('', [Validators.required]),
    UserType: new UntypedFormControl('', [Validators.required]),
    SASSId: new UntypedFormControl(1),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage, private data: DataService, private router: Router) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data !== 0) {
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.getUserTypeData()
    localStorage.removeItem('LoginData');
  }

  submit() {
    this.responseText = ""; 
    this.BasePassword = btoa(this.form.controls['Password'].value);
    this.form.get('Password').setValue(this.BasePassword); 
    this.data.ValidateUser(this.form.getRawValue())
      .subscribe((response: any) => {
        if (response.errorResponse.success) {
          this.Createtoken(this.form.value);
          localStorage.setItem('logintime', Date())
          this.router.navigate(["/dashboard/admin"]);
        }
        else {
          this.response = false;
          this.responseText = response.errorResponse.error.message;
        }
      });
  }
  public Createtoken(uservalue: getvalidateuser) {
    const result = btoa(uservalue.UserName);
    localStorage.setItem('LoginData', result);
  }

  getUserTypeData() {
    this.data.getUserType().subscribe((res: apiResultFormat) => {
      res.data.map((res: getusertype, index: number) => {
        this.UserType.push(res);
      });
      this.UserType = this.UserType.filter(a => a.Status == "Active");
      this.UserType = this.UserType.reverse();
    });
  }
  OnUserTypeChange(iUsertypeID: any) {
    const UserName = this.UserType.filter(a => a.Id == iUsertypeID && a.Status == "Active")[0].UserName;
    const UserId = this.UserType.filter(a => a.Id == iUsertypeID && a.Status == "Active")[0].UserId.toString(); 
    if (iUsertypeID == 1) {
      localStorage.setItem('iUserTypeID', iUsertypeID);
      localStorage.setItem('UserTypeCode', 'Instructor');
      localStorage.setItem('SASSId', this.sassid);
      localStorage.setItem('UserId', UserId);
      localStorage.setItem('UserName', UserName);
    }
    else {
      localStorage.setItem('UserTypeCode', 'Member');
      localStorage.setItem('iUserTypeID', iUsertypeID);
      localStorage.setItem('SASSId', this.sassid);
      localStorage.setItem('UserId', UserId);
      localStorage.setItem('UserName', UserName);
    } 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }

}
