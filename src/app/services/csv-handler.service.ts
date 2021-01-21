import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvHandlerService {

  private readonly BASE_URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  uploadFile(csvFile: File): Observable<string[]> {
    const url = this.BASE_URL + `/api/file/upload`;
    const formData: FormData = new FormData();
    formData.append('file', csvFile, csvFile.name);
    return this.http.post<string[]>(url, formData);
  }
}
