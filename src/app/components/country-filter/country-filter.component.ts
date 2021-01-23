import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.scss']
})
export class CountryFilterComponent implements OnInit {

  @Input() countries: Country[];
  @Output() setCountry: EventEmitter<Country> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectCountry(country) {
    this.setCountry.emit(country);
  }

}
