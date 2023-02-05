import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRequest(url: string){
    return this.http.get(this.baseUrl + url).pipe(map(res => {
      return res;
    }));
  }

  postRequest(url: string, payload: any) {
    return this.http.post(this.baseUrl + url, payload).pipe(map(res => {
      return res;
    }));
  }
}
