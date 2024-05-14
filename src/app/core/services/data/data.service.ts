import { Injectable, OnInit, Renderer2 } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import {
  MultiLevelMenu,
  SideBar,
  SideBarMenu,
  apiResultFormat,
  routes,
} from '../../core.index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { fitnessconstants } from 'src/app/sharedutils/fitnessconstants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  allAppliedCandidates!: Array<object>;
  apiUrl: string = "";

  constructor(private http: HttpClient, private constants: fitnessconstants) { }

  //#region Lookup

  public getUserType(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetUserType;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountry(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetLocationCountry;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getState(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetLocationState;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGender(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetGenderType;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMaritalstatus(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetMaritalStatus;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityType(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetActivityType;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityTrack(UserId): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetActivityTracking + '/' + UserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getIntensitylevel(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetIntensitylevel;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public UpdateActivityTracking(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.UpdateActivityTracking;
    return this.http.post(this.apiUrl, body, { headers: header });
  }
  public InsertActivityTracking(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.InsertActivityTracking;
    return this.http.post(this.apiUrl, body, { headers: header });
  }

  public getGoalType(): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetGoalType;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCurrentProgress(iUserId): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ProgressTrackingAPI + fitnessconstants.GetCurrentProgress + '/' + iUserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTargetProgress(iUserId): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetTargetProgress + '/' + iUserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getWeightProgress(iUserId): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ProgressTrackingAPI + fitnessconstants.GetWeightProgress + '/' + iUserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFatProgress(iUserId): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ProgressTrackingAPI + fitnessconstants.GetFatProgress + '/' + iUserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMuscleMassProgress(iUserId): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ProgressTrackingAPI + fitnessconstants.GetMuscleProgress + '/' + iUserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  //#endregion Lookup

  //#region User Profile

  public getUserProfile(UserId: string): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetUserProfile + '/' + UserId;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public InsertUserProfile(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.InsertUser;
    return this.http.post(this.apiUrl, body, { headers: header });
  }
  public UpdateUserProfile(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.UpdateUser;

    return this.http.post(this.apiUrl, body, { headers: header });
  }

  //#endregion UserProfile

  //#region User Profile

  public getGoalSetting(iUserID): Observable<apiResultFormat> {
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.GetGoalSetting + '/' + iUserID;
    return this.http.get<apiResultFormat>(this.apiUrl).pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public InsertGoalSetting(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.InsertGoalSetting;
    return this.http.post(this.apiUrl, body, { headers: header });
  }
  public UpdateGoalSetting(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.UpdateGoalSetting;

    return this.http.post(this.apiUrl, body, { headers: header });
  }

  //#endregion UserProfile



  public ValidateUser(formData: FormData) {
    let body = JSON.stringify(formData);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = "";
    this.apiUrl = environment.ApplicationAPI + fitnessconstants.ValidateUser;
    return this.http.post<apiResultFormat>(this.apiUrl, body, { headers: header })
  }


  public sideBar: SideBar[] = [
    {
      tittle: '',
      icon: 'airplay',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.admin,
          hasSubRoute: false,
          showSubRoute: false,
          icon: "fas fa-pie-chart",
          base: 'admin',
          materialicons: 'person',
          subMenus: [],
        },
      ],
      visible: true,
    },
    // {
    //   tittle: '',
    //   icon: 'airplay',
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'Profile Creation',
    //       route: routes.profilecreation,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       icon: 'fas fa-user',
    //       base: 'create-profile',
    //       materialicons: 'person',
    //       subMenus: [],
    //     },
    //   ],
    //   visible: true,
    // },
    // {
    //   tittle: '',
    //   icon: 'airplay',
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'Activity Tracking',
    //       route: routes.activitytracking,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       icon: 'fas fa-running',
    //       base: 'activity-tracking',
    //       materialicons: 'person',
    //       subMenus: [],
    //     },
    //   ],
    //   visible: true,
    // },
    // {
    //   tittle: '',
    //   icon: 'airplay',
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'Goal Setting',
    //       route: routes.goalsetting,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       icon: "fa fa-trophy",
    //       base: 'goal-setting',
    //       materialicons: 'person',
    //       subMenus: [],
    //     }
    //   ],
    //   visible: true,
    // },
    // {
    //   tittle: '',
    //   icon: 'airplay',
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'Progress Tracking',
    //       route: routes.progresstracking,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       icon: "fas fa-hourglass",
    //       base: 'progress-tracking',
    //       materialicons: 'person',
    //       subMenus: [],
    //     }
    //   ],
    //   visible: true,
    // }

  ];



  public getSideBarData: BehaviorSubject<Array<SideBar>> = new BehaviorSubject<
    Array<SideBar>
  >(this.sideBar);
  public resetData(): void {
    this.sideBar.map((res: SideBar) => {
      res.showAsTab = false;
      res.menu.map((menus: SideBarMenu) => {
        menus.showSubRoute = false;
      });
    });
  }


}
