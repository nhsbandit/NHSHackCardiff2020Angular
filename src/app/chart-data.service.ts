import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface RequestResult {
  meta: any;
  resultSet: Array<any>;
}

@Injectable()
export class ChartDataService {

  constructor(private http: HttpClient) { }

  chartData() {
    return this.http.get('http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22')
      .pipe(map(result => result));
  }





  BoYaAData(ehrid: string): Observable<RequestResult> {
    const randomint = Math.random();
    return this.http.post<RequestResult>('https://rest.ehrscape.com/rest/v1/query?random=' + randomint,
      JSON.stringify({
        aql: "select b_a/data[at0001|History|]/events[at0006|Any event|]/data[at0003]/items[at0004|Systolic|]/value/magnitude as SysUnit, b_a/data[at0001|History|]/events[at0006|Any event|]/data[at0003]/items[at0004|Systolic|]/value/units as SysValue, b_a/data[at0001|History|]/events[at0006|Any event|]/data[at0003]/items[at0005|Diastolic|]/value/magnitude as DiasUnit, b_a/data[at0001|History|]/events[at0006|Any event|]/data[at0003]/items[at0005|Diastolic|]/value/units as DiasValue, b_a/data[at0001|History|]/origin/value as CaptureDate, a/composer/name as Author from EHR e contains COMPOSITION a[openEHR-EHR-COMPOSITION.health_summary.v1] contains OBSERVATION b_a[openEHR-EHR-OBSERVATION.blood_pressure.v2] where a/name/value='NHSHD23 BoYaA' order by b_a/data[at0001|History|]/origin desc offset 0 limit 20"
      }), this.getRequestOptions()).pipe(map((response: any) => response));
  }

  BoYaADataPeak(ehrid: string): Observable<RequestResult> {
    const randomint = Math.random();
    return this.http.post<RequestResult>('https://rest.ehrscape.com/rest/v1/query?random=' + randomint,
      JSON.stringify({
        aql: "select a_a/data[at0001|Event Series|]/events[at0002|Any event|]/data[at0003]/items[at0127|Result details|]/items[at0057|Pulmonary flow rate result|]/items[at0058|Actual result|]/value/magnitude as Result, a_a/data[at0001|Event Series|]/origin/value as Time from EHR e contains COMPOSITION a contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.pulmonary_function.v0] Order by a_a/data[at0001|Event Series|]/origin/value desc limit 20"
      }), this.getRequestOptions()).pipe(map((response: any) => response));
  }

  svg() {
    return this.http.post<any>('https://mph-iweb.tst.nhs.uk/EPRMojoObs/svg.php'
      , JSON.stringify({ patientID: '12345', rangeType: 'last', rangeValue: '24' }), this.getRequestOptionsSVG())
      .pipe(response => response);
  }

  private getRequestOptions() {
    const httpPostOptions = {
      headers:
        new HttpHeaders({
          'Accept': 'application/json', 'Content-Type': 'application/json'
          , Authorization: 'Basic am9obi5tZXJlZGl0aEB3YWxlcy5uaHMudWs6ZWhyNGpvaG4ubWVyZWRpdGg='
        }),
      withCredentials: true
    };
    return httpPostOptions;
  }

  private getRequestOptionsSVG() {
    const responseType = 'text';
    const httpPostOptions = {
      headers:
        new HttpHeaders({
          Accept: 'image/svg', 'Content-Type': 'application/json'
          , Authorization: 'Basic am9obi5tZXJlZGl0aEB3YWxlcy5uaHMudWs6ZWhyNGpvaG4ubWVyZWRpdGg='
        })
      , withCredentials: true
      , responseType: responseType as any,
    };
    return httpPostOptions;
  }

}
