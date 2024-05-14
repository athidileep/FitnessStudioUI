import { BehaviorSubject } from 'rxjs';

export class routes {
  public static layoutDirection: BehaviorSubject<string> =
    new BehaviorSubject<string>(localStorage.getItem('rtl') || '');
  private static Url = '';
  static rtl = this.layoutDirection.subscribe((res: string) => {
    this.Url = res;
  });

  public static get baseUrl(): string {
    return this.Url;
  }

  //#region OLD

  public static get login(): string {
    return this.baseUrl + '/login';
  }
  public static get forgot_password(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  public static get lock_screen(): string {
    return this.baseUrl + '/lock-screen';
  }
  public static get dashboard(): string {
    return this.baseUrl + '/dashboard';
  }
  public static get admin(): string {
    return this.baseUrl + '/dashboard/admin';
  }
  public static get employeesss(): string {
    return this.baseUrl + '/dashboard/employee';
  }
  public static get apps(): string {
    return this.baseUrl + '/apps';
  }
  public static get chat(): string {
    return this.baseUrl + '/apps/chats';
  }
  public static get employeess(): string {
    return this.baseUrl + '/employees';
  }
  public static get clientPage(): string {
    return this.baseUrl + '/clients/client-page';
  }
  public static get projects(): string {
    return this.baseUrl + '/projects';
  }
  public static get projectpage(): string {
    return this.baseUrl + '/projects/project-page';
  }
  public static get tasks(): string {
    return this.baseUrl + '/projects/tasks';
  }
  public static get taskboard(): string {
    return this.baseUrl + '/projects/task-board';
  }
  public static get leads(): string {
    return this.baseUrl + '/leads/main';
  }
  public static get ticketpage(): string {
    return this.baseUrl + '/tickets/ticket-page';
  }
  public static get employeeProfile(): string {
    return this.baseUrl + '/employees/employee-profile';
  }
  public static get loginpro(): string {
    return this.baseUrl + '/login';
  }
  public static get registers(): string {
    return this.baseUrl + '/register';
  }
  public static get forgotpassword(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get otp(): string {
    return this.baseUrl + '/otp';
  }
  public static get error(): string {
    return this.baseUrl + '/404';
  }
  public static get errors(): string {
    return this.baseUrl + '/500';
  }
  public static get search(): string {
    return this.baseUrl + '/pages/search';
  }
  public static get adminDashboard(): string {
    return this.baseUrl + '/dashboard/admin';
  }

  //#endregion OLD

  public static get tracking(): string {
    return this.baseUrl + '/tracking';
  }
  public static get activitytracking(): string {
    return this.baseUrl + '/tracking/activity-tracking'; 
  }
  public static get goalsetting(): string {
    return this.baseUrl + '/tracking/goal-setting'; 
  }
  public static get progresstracking(): string {
    return this.baseUrl + '/tracking/progress-tracking'; 
  }
  public static get profilecreation(): string {
    return this.baseUrl + '/tracking/create-profile'; 
  }
}
