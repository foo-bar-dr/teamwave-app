import { Injectable } from '@angular/core';
import { baseUrl } from './../classes/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExtractionService {

constructor(private http: HttpClient) { }

  private advancedSearchUrl = baseUrl;

  advancedSearch(inputParams: any, pageIndex: any, pageSize: any): Observable<any> {
    console.log(inputParams);
    inputParams.site = 'stackoverflow';
    inputParams.key = 'OSni39pEL31BGYyb)7WsdA((';
    inputParams.pagesize = pageSize;
    inputParams.page = parseInt(pageIndex) + 1;
    console.log(inputParams);
    return this.http.get(this.advancedSearchUrl, {
      params: inputParams
    });
  }

}
