import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { httprequestor } from '../../../services/httprequestor';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,

  ApexAxisChartSeries,

  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend

} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;

  seriess: ApexAxisChartSeries;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;

};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild("chart") chart: ChartComponent;
  public requestDetails: Partial<ChartOptions>;
  public recordDetails: Partial<ChartOptions>;
  fromDate: any;
  toDate: any;
  payGroup: string;
  lab: any = ["USA_WEEKLY_2023_09_12"];
  stageSeries: any = [];
  stageLabels: any = [];
  recordSeries: any = [];
  recordLabels: any = [];


  constructor(private _httprequestor: httprequestor) {

    // this.GetRequestDetails();
    // this.GetRecordDetails();
    this.getFilteredData()
  }


  GetRequestDetails() {
    try {
      //this._httprequestor.GetRequestDetails().subscribe(response => {
      // this.chartOptions = {
      //   series: [3,32, 7,4],
      //   labels: ["TRANSFORMATIONSTARTED", "COMPLETED", "STARTEDPROCESSING", "STAGINGSTARTED"],
      // };
      //});
      // this.chartOptions = {
      //   series: [3,32, 7,4],
      //   labels: ["TRANSFORMATIONSTARTED", "COMPLETED", "STARTEDPROCESSING", "STAGINGSTARTED"]
      // }; 

      this.requestDetails = {
        series: this.stageSeries,
        chart: {
          width: 480,
          type: "pie"
        },
        labels: this.stageLabels,
        dataLabels: { // add this part to remove %
          enabled: true,
          formatter(value: any, opts: any): any {
            return opts.w.config.series[opts.seriesIndex];
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 100,
                innerHeight: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    }
    catch (e) {

    }

  }

  GetRecordDetails() {
    try {
      this.recordDetails = {
        seriess: this.recordSeries,
        chart: {
          type: "bar",
          height: 260,
          width: 480,
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        title: {
          text: "Fiction Books Sales"
        },
        xaxis: {
          categories: ['USA_WEEKLY_2023_09_12']
          , labels: {
            formatter: function (val) {
              return val + "h";
            }
          }
          //,labels:['USA_WEEKLY_2023_09_12', 'USA_WEEKLY_2023_09_11']
        },
        yaxis: {

          title: {
            text: "undefined"
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "K";
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      };
    }
    catch (e) {

    }

  }

  getFilteredData() {
    var res = null
    let records: any = [];
    let stage: any = [];
    //records = JSON.parse('[{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"2","failurecount":"1","warningcount":"1","startdate":"2023-09-13","enddate":"2023-09-14"},{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"1","failurecount":"1","warningcount":"0","startdate":"2023-09-12","enddate":"2023-09-13"},{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"1","failurecount":"1","warningcount":"0","startdate":"2023-09-11","enddate":"2023-09-12"},{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"4","failurecount":"3","warningcount":"1","startdate":"2023-09-11","enddate":"2023-09-14"}]');
    records=JSON.parse('[{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"10","failurecount":"6","warningcount":"3","startdate":"2023-09-13","enddate":"2023-09-14"},{"paygroup":"USA_WEEKLY_2023_09_11","successcount":"6","failurecount":"4","warningcount":"2","startdate":"2023-09-12","enddate":"2023-09-13"},{"paygroup":"USA_WEEKLY_2023_09_10","successcount":"4","failurecount":"3","warningcount":"2","startdate":"2023-09-11","enddate":"2023-09-12"},{"paygroup":"USA_WEEKLY_2023_09_09","successcount":"4","failurecount":"3","warningcount":"2","startdate":"2023-09-11","enddate":"2023-09-14"}]')
    stage = JSON.parse('[{"TRANSFORMATIONSTARTED":10,"COMPLETED":4,"STARTEDPROCESSING":3,"STAGINGSTARTED":3,"startdate":"2023-09-11","enddate":"2023-09-12","paygroup":"USA_WEEKLY_2023_09_12"},{"TRANSFORMATIONSTARTED":6,"COMPLETED":2,"STARTEDPROCESSING":3,"STAGINGSTARTED":1,"startdate":"2023-09-12","enddate":"2023-09-13","paygroup":"USA_WEEKLY_2023_09_12"}]');


    if (this.fromDate != null && this.toDate != null) {

      records = records.filter((ress: any) => {
        return ress.startdate >= this.fromDate && ress.enddate <= this.toDate
      })

      stage = stage.filter((ress: any) => {
        return ress.startdate >= this.fromDate && ress.enddate <= this.toDate
      })
    }
    else {
      // records = records.filter((ress: any) => {
      //   return ress.successcount == 4
      // })

      stage = stage.filter((ress: any) => {
        return ress.TRANSFORMATIONSTARTED == 10
      }) 
    }
    if (this.payGroup != null) {
      records = records.filter((ress: any) => {
        return ress.paygroup >= this.payGroup
      })
    }

    this.recordSeries = [];
    //if(records.length>0){
     // for(let i=0;i<records.length;i++){
        this.recordSeries.push({ name: "Success", data: [records[0].successcount,records[1].successcount,records[2].successcount,records[3].successcount] });
        this.recordSeries.push({ name: "Failure", data: [records[0].failurecount,records[1].failurecount,records[2].failurecount,records[3].failurecount] });
        this.recordSeries.push({ name: "Warning", data: [records[0].warningcount,records[1].warningcount,records[2].warningcount,records[3].warningcount] });
      //}
    //}
    
    this.recordLabels=[];
    this.recordLabels=[records[0].paygroup,records[1].paygroup,records[2].paygroup,records[3].paygroup];
    this.GetRecordDetails();

    this.stageSeries = [];
    this.stageSeries.push(stage[0].TRANSFORMATIONSTARTED);
    this.stageSeries.push(stage[0].COMPLETED);
    this.stageSeries.push(stage[0].STARTEDPROCESSING);
    this.stageSeries.push(stage[0].STAGINGSTARTED); 
    this.stageLabels = ["TRANSFORMATIONSTARTED", "COMPLETED", "STARTEDPROCESSING", "STAGINGSTARTED"];
    this.GetRequestDetails();
  }

  applyFilter(type: string, result: any) {
    var res = null
    let records: any = [];
    records = JSON.parse('[{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"2","failurecount":"1","warningcount":"1","startdate":"2023-09-13","enddate":"2023-09-14"},{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"1","failurecount":"1","warningcount":"0","startdate":"2023-09-12","enddate":"2023-09-13"},{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"1","failurecount":"1","warningcount":"0","startdate":"2023-09-11","enddate":"2023-09-12"},{"paygroup":"USA_WEEKLY_2023_09_12","successcount":"4","failurecount":"3","warningcount":"1","startdate":"2023-09-11","enddate":"2023-09-14"}]');

    if (this.fromDate != null && this.toDate != null) {
      res = records.filter((ress: any) => {
        return ress.startdate >= this.fromDate && ress.enddate <= this.toDate
      })

      this.recordDetails.seriess = [{ name: "Success", data: res.successcount }, { name: "Failure", data: res.failurecount }, { name: "Warning", data: res.warningcount }];
    }
    if (this.payGroup != null) {
      res = records.filter((ress: any) => {
        return ress.paygroup >= this.payGroup
      })

    }
  }

  resetFilter() {
    this.fromDate = "";
    this.toDate = "";
    this.payGroup = "";
    //this.highleveldetailedView=this.requestHighlevel;
  }
}
