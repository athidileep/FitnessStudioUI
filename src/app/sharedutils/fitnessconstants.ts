/* eslint-disable @typescript-eslint/no-inferrable-types */

export class fitnessconstants {

    public static ValidateUser: string = "validateuser";

    public static GetUserType: string = "getusertype";
    public static GetLocationCountry: string = "getcountry";
    public static GetLocationState: string = "getstate";
    public static GetGenderType: string = "getgender";
    public static GetActivityType: string = "getactivitytype";
    public static GetIntensitylevel: string = "getintensitylevel";
    public static GetMaritalStatus: string = "getmaritalstatus";
    public static GetGoalType: string = "getgoaltype";

    //#region UserProfile

    public static GetUserProfile: string = "getuserprofile";
    public static InsertUser: string = "insertuserprofile";
    public static UpdateUser: string = "updateuserprofile";

    //#endregion

     //#region GoalSetting

     public static GetGoalSetting: string = "getgoalsetting";
     public static InsertGoalSetting: string = "insertgoalsetting";
     public static UpdateGoalSetting: string = "updategoalsetting"; 
 
     //#endregion
    
    //#endregion Activity
    public static GetActivityTracking: string = "getactivitytracking";
    public static InsertActivityTracking: string = "insertactivitytracking";
    public static UpdateActivityTracking: string = "updateactivitytracking";
    //#endregion

    
    //#region ProgressTracking

    public static GetCurrentProgress: string = "getcurrentprogress"; 
    public static GetTargetProgress: string = "gettargetprogress"; 
    public static GetWeightProgress: string = "getweightprogress"; 
    public static GetFatProgress: string = "getfatprogress"; 
    public static GetMuscleProgress: string = "getmusclemassprogress"; 

    //#endregion
}
