import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { Subscription, Observable, timer } from 'rxjs';


import { ChartDataService, RequestResult } from '../chart-data.service';

@Component({
  selector: 'app-peakflow',
  templateUrl: './peakflow.component.html',
  styleUrls: ['./peakflow.component.css']
})
export class PeakflowComponent implements OnInit {

  private subscription: Subscription;

  remainingTime: number;

  minutes: number;

  seconds: number;

  everySecond: Observable<number> = timer(0, 2000);

  data: RequestResult;
  lineChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    animation: false,
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 20,    // minimum will be 20, unless there is a lower value.
                // OR //
                // beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  flowData = [];

  constructor(private chart: ChartDataService) {
    this.getData();
  }

  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      this.getData();
    });
  }

  private getData() {
    this.chart.BoYaADataPeak('').subscribe(results => {
            if (results) {
                // console.log(results);
                this.data = results;
                console.log(this.data.resultSet);
                this.lineChartLabels = [];
                this.flowData = [];
                this.data.resultSet.forEach(value =>  {
                    this.flowData.push(value.Result);
                    const date = new Date(value.Time);
                    const dateStr = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    this.lineChartLabels.push(dateStr)
                });
                // console.log(this.sysData);
                // console.log(this.diaData);
                this.lineChartLabels = this.lineChartLabels.reverse();
                this.lineChartData = [
                  { data: this.flowData.reverse(), label: 'Flow' }
                ];
            }
        });
  }


}

