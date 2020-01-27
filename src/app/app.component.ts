import { Component } from '@angular/core';
import { ChartDataService, RequestResult } from '../app/chart-data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NHSHackCardiff2020Angular';
  data: RequestResult;

  constructor(private chart: ChartDataService) {

    this.chart.BoYaAData('').subscribe(results => {
            if (results) {
                // console.log(results);
                this.data = results;
                console.log(this.data.resultSet);
            }
        });

   }

}
