import { Component, Input, OnInit } from '@angular/core';
import { ClearRow } from 'src/app/models/clear-row';
import { Country } from 'src/app/models/country';
import { Header } from 'src/app/models/header';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  @Input() headers: Header[];
  @Input() clearings: ClearRow[];

  constructor() { }

  ngOnInit(): void {
  }

  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll();
  }

}
