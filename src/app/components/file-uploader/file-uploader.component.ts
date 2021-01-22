import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
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
  $data;

  constructor(private csvHandler: CsvHandlerService) { }

  summarizeFiles() {
    console.log('clicked');
    this.csvHandler.uploadFile(this.files[0])
      .subscribe(res => console.log(res));
  }

  query(country?) {
    this.$data = this.csvHandler.getData();
  }

  /**
   * on files drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle files from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
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
  prepareFilesList(files: Array<any>) {
    if (this.numfOfAllowedFiles === 1 && files.length > 1 || this.numfOfAllowedFiles > 1 && files.length > this.numfOfAllowedFiles)
      return;
    if (this.numfOfAllowedFiles === 1)
      this.files = [];
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
