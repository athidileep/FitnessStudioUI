import { Component, Input, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive

} from "ng-apexcharts";
import { DataService, apiResultFormat, getcurrentprogress, getfatprogress, getmusclemassprogress, gettargetprogress, getweightprogress } from "src/app/core/core.index";
import { routes } from "src/app/core/helpers/routes/routes";
import { ApexOptions } from 'ng-apexcharts';
import { formatDate } from "@angular/common";
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  fill: ApexFill;
  labels: string[];

};

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent {
  @Input() chartData: any[];
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;
  public WeightChart: Array<getweightprogress> = [];
  public FatChart: Array<getfatprogress> = [];
  public MuscleMassChart: Array<getmusclemassprogress> = [];
  public UserId: number = parseInt(localStorage.getItem('UserId'));
  public Currentprogress: Array<getcurrentprogress> = [];
  public Targetprogress: Array<gettargetprogress> = [];
  public layoutWidth = '1';
  public objWeight: any;
  public objBodyFat: any;
  public objMuscleMass: any;
  public objTargetWeight: any;
  public objTargetBodyFat: any;
  public objTargetMuscleMass: any;
  public routes = routes;
  constructor(private data: DataService) { }
  FatOption: ApexOptions = {
    series: [
      {
        name: "series1",
        data: [50, 75, 50, 75, 50, 75, 100],
        color: '#ff9b44',

      },
      {
        name: "series2",
        data: [],
        color: '#fc6075',
      }
    ],
    chart: {
      height: 350,
      type: "line"
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime",
      categories: []

    },
  };
  MuscleOption: ApexOptions = {
    chart: {
      type: 'line',
    },
    series: [
      {
        name: 'Muscle Mass',
        data: [],
        color: '#fc6075',
      },
    ],
    xaxis: {
      categories: [],
    },
  };
  chartOptions: ApexOptions = {
    series: [
      {
        name: "Wight",
        data: [],
        color: '#fc6075',
      },
    ],
    chart: {
      type: "bar",
    },
    xaxis: {
      type: "datetime",
      categories: []
    },
  };
  ngOnInit() {
    this.GetMuscleMass();
    this.GetFatProgress();
    this.GetweightProgress();
    this.GetCurrentProgress();
    this.GetTargetProgress();
  }
  ngOnChanges() {
    if (this.WeightChart && this.WeightChart.length > 0) {
      this.chartOptions.series = [
        {
          name: 'Weight',
          data: this.WeightChart.map((data) => data.Weight),
        },
      ];
      this.chartOptions.xaxis = {
        categories: this.WeightChart.map((data) => {
          const date = new Date(data.InfoDate);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
          const year = date.getFullYear().toString();
          return `${day}-${month}-${year}`;
        }),
      };
    }
    if (this.MuscleMassChart && this.MuscleMassChart.length > 0) {
      this.MuscleOption.series = [
        {
          name: 'Muscle Mass',
          data: this.MuscleMassChart.map((data) => data.MuscleMass),
        },
      ];
      this.MuscleOption.xaxis = {
        categories: this.MuscleMassChart.map((data) => {
          const date = new Date(data.InfoDate);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
          const year = date.getFullYear().toString();
          return `${day}-${month}-${year}`;
        }),
      };
    }
    if (this.FatChart && this.FatChart.length > 0) {
      this.FatOption.series = [
        {
          name: 'Body Fat',
          data: this.FatChart.map((data) => data.BodyFat),
        },
      ];
      this.FatOption.xaxis = {
        categories: this.FatChart.map((data) => {
          const date = new Date(data.InfoDate);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
          const year = date.getFullYear().toString();
          return `${day}-${month}-${year}`;
        }),
      };
    }
  }
  GetMuscleMass() {
    const UserId = this.UserId;
    this.data.getMuscleMassProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: getmusclemassprogress, index: number) => {
        this.MuscleMassChart.push(res);
        if (this.MuscleMassChart && this.MuscleMassChart.length > 0) {
          this.ngOnChanges();
        }
      });
    });
  }
  GetFatProgress() {
    const UserId = this.UserId;
    this.data.getFatProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: getfatprogress, index: number) => {
        this.FatChart.push(res);
        if (this.FatChart.length > 0) {
          this.ngOnChanges();
        }
      });
    });
  }
  GetweightProgress() {
    const UserId = this.UserId;
    this.data.getWeightProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: getweightprogress, index: number) => {
        this.WeightChart.push(res);
        if (this.WeightChart.length > 0) {
          this.ngOnChanges();
        }
      });
    });
  }
  GetCurrentProgress() { 
    const UserId = this.UserId;
    this.data.getCurrentProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: getcurrentprogress, index: number) => {
        this.Currentprogress.push(res);
        if (this.Currentprogress.length > 0) {
          this.objWeight = this.Currentprogress.map((data) => data.Weight);
          this.objBodyFat = this.Currentprogress.map((data) => data.BodyFat);
          this.objMuscleMass = this.Currentprogress.map((data) => data.MuscleMass);
        }
      });
    });
  }
  GetTargetProgress() {
    const UserId = this.UserId;
    this.data.getTargetProgress(UserId).subscribe((res: apiResultFormat) => {
      res.data.map((res: gettargetprogress, index: number) => {
        this.Targetprogress.push(res); 
        if (this.Targetprogress.length > 0) {
          this.objTargetWeight = this.Targetprogress.map((data) => data.TargetWeight);
          this.objTargetBodyFat = this.Targetprogress.map((data) => data.TargetBodyFat);
          this.objTargetMuscleMass = this.Targetprogress.map((data) => data.TargetMuscleMass);
        }
      });
    });
  }
}
