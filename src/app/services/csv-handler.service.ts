import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ClearRow } from '../models/clear-row';

@Injectable({
  providedIn: 'root'
})
export class CsvHandlerService {

  private readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  uploadFiles(csvFiles: File[]): Observable<string[]> {
    const url = this.BASE_URL + `/api/file/upload`;
    const formData: FormData = new FormData();
    csvFiles.forEach(csvFile => formData.append('file', csvFile));
    return this.http.post<string[]>(url, formData);
  }

  getData(country?: string): Observable<ClearRow[]> {
    const countryAppend = country ? `query?country=${country}` : '';
    const url = this.BASE_URL + `/api/query` + countryAppend;
    return this.http.get<ClearRow[]>(url);
  }
}
