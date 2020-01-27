import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ChartDataService } from '../app/chart-data.service';
import { BloodpressureComponent } from './bloodpressure/bloodpressure.component';
import { PeakflowComponent } from './peakflow/peakflow.component';

const appRoutes: Routes = [
  { path: 'bloodpressure', component: BloodpressureComponent },
  { path: 'peakflow', component: PeakflowComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BloodpressureComponent,
    PeakflowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
