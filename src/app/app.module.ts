import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DragNDropDirective } from './directives/drag-n-drop.directive';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CountryFilterComponent } from './components/country-filter/country-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    DragNDropDirective,
    TableComponent,
    DataTableComponent,
    CountryFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AutocompleteLibModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
