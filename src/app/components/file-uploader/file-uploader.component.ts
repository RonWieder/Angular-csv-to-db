import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClearRow } from 'src/app/models/clear-row';
import { CsvHandlerService } from 'src/app/services/csv-handler.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
  files: File[] = [];
  @Input() filesTypes: string[] = [];
  @Input() numfOfAllowedFiles: number | undefined;

  $countries: Observable<string[]>;
  $data: Observable<ClearRow[]>;

  private loader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loader$ = this.loader.asObservable();

  constructor(private csvHandler: CsvHandlerService) { }

  /**
   * sending file\s to server
   */
  sendFiles() {
    this.$countries = this.csvHandler.uploadFiles(this.files);
    this.files = [];
  }

  /**
   *
   * @param country query data from server filterd on Country
   */
  query(country?) {
    this.$data = this.csvHandler.getData();
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
