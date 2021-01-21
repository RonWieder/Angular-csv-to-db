import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DragNDropDirective } from './directives/drag-n-drop.directive';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    DragNDropDirective,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
