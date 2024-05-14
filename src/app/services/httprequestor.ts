
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http'
import { fitnessconstants } from '../sharedutils/fitnessconstants'
import { environment } from '../../environments/environment' 
import { Injectable } from '@angular/core';
import { fitnesssessionmodels } from '../sharedutils/fitnesssessionmodels';

@Injectable({
    providedIn: 'root'
})
export class httprequestor {


    constructor(private httpclient: HttpClient, private sessionmdl: fitnesssessionmodels) { }

    // ValidateUser(userName: string, pwd: string) {
    //     let url = environment.hrmsAPiUrl + fitnessconstants.ValidateUserEndPoint + "/?userName=" + userName + "&pwd=" + pwd;
    //     return this.httpclient.get<any>(url);
    // }

    //AddUser(user: usermodel) {
        // let url = environment.hrmsAPiUrl + fitnessconstants.ValidateUserEndPoint;
        // return this.httpclient.post<any>(url, user);
    //}

    GetRequestHighlevelDetails(fromdate: Date, todate: Date, paygroup: string) {
        // let url = environment.hrmsAPiUrl + fitnessconstants.GetRequestHighLevelDetails + "/" + fromdate + "/" + todate + "/" + paygroup;
        // return this.httpclient.get<any>(url);

        var res = JSON.parse('[{"requestdetailid":"1001","paygroup":"USA_WEEKLY_2023_09_12","receivedcount":"4","successcount":"3","failurecount":"1","startdate":"2023-09-11","enddate":"2023-09-12","timetaken":"120"},{"requestdetailid":"1002","paygroup":"USA_WEEKLY_2023_09_12","receivedcount":"4","successcount":"3","failurecount":"1","startdate":"2023-09-11","enddate":"2023-09-12","timetaken":"120"},{"requestdetailid":"1003","paygroup":"USA_WEEKLY_2023_09_12","receivedcount":"4","successcount":"3","failurecount":"1","startdate":"2023-09-11","enddate":"2023-09-12","timetaken":"120"},{"requestdetailid":"1004","paygroup":"USA_WEEKLY_2023_09_12","receivedcount":"4","successcount":"3","failurecount":"1","startdate":"2023-09-11","enddate":"2023-09-12","timetaken":"120"}]');
        return res;
    }

    // GetRequestLowlevelDetails(fromdate: Date, todate: Date, paygroup: string) {
    //     let url = environment.hrmsAPiUrl + fitnessconstants.GetRequestLowLevelDetails + "/" + fromdate + "/" + todate + "/" + paygroup;
    //     return this.httpclient.get<any>(url);
    // }

    // GetTotalRecordsForPayGroups(fromdate: Date, todate: Date, paygroup: string) {
    //     let url = environment.hrmsAPiUrl + fitnessconstants.GetTotalRecordsForPayGroups + "/" + fromdate + "/" + todate + "/" + paygroup;
    //     return this.httpclient.get<any>(url);
    // }

    // GetTotalRequestsForPayGroups(fromdate: Date, todate: Date, paygroup: string) {
    //     let url = environment.hrmsAPiUrl + fitnessconstants.GetTotalRequestsForPayGroups + "/" + fromdate + "/" + todate + "/" + paygroup;
    //     return this.httpclient.get<any>(url);
    // }
}