import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClearRow } from 'src/app/models/clear-row';
import { Country } from 'src/app/models/country';
import { Header } from 'src/app/models/header';
import { CsvHandlerService } from 'src/app/services/csv-handler.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  files: File[] = [];
  @Input() filesTypes: string[] = [];
  @Input() numfOfAllowedFiles: number | undefined;

  $countries: Observable<Country[]>;
  $clearings: Observable<ClearRow[]>;

  headers: Header[] = [
    { field: 'Country' },
    { field: 'Period' },
    { field: 'Data Usage' },
    { field: 'Data Charges' },
    { field: 'SMS Usage' },
    { field: 'SMS Charges' },
    { field: 'MOC Usage' },
    { field: 'MOC Charges' },
    { field: 'MTC Usage' },
    { field: 'MTC Charges' },
  ]

  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loader$ = this.loading.asObservable();

  constructor(private csvHandler: CsvHandlerService) { }

  ngOnInit(): void {
    this.queryCountries();
  }

  /**
   * sending file\s to server
   */
  sendFiles() {
    this.loading.next(true);
    this.$countries = this.csvHandler.uploadFiles(this.files).pipe(
      map(data => data['countries']),
      tap(() => this.loading.next(false))
    );
    this.files = [];
  }

  queryCountries() {
    this.loading.next(true);
    this.$countries = this.csvHandler.getCountries().pipe(
      tap(() => this.loading.next(false))
    );
  }

  /**
   *
   * @param country query data from server filterd on Country
   */
  queryByCountry(countryObject: Country) {
    this.$clearings = this.csvHandler.getData(countryObject.country);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Validate num of files uploaded corresponds with num of files limitation,
   * and if it is, it converts Files list to normal array list
   * @param files (Files List)
   */
  updateFilesList(files: File[]) {
    for (const file of files) {
      this.files.push(file);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
