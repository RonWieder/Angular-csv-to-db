import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ClearRow } from '../models/clear-row';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CsvHandlerService {

  private readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  uploadFiles(csvFiles: File[]): Observable<Country[]> {
    const url = this.BASE_URL + `/api/file/upload`;
    const formData: FormData = new FormData();
    csvFiles.forEach(csvFile => formData.append('files', csvFile));
    return this.http.post<Country[]>(url, formData);
  };

  getData(country: string = ''): Observable<ClearRow[]> {
    const url = this.BASE_URL + `/api/query`;
    return this.http.get<ClearRow[]>(url, {
      params: {
        country
      }
    });
  };

  getCountries(): Observable<Country[]> {
    const url = this.BASE_URL + `/api/countries`;
    return this.http.get<Country[]>(url);
  };
}
