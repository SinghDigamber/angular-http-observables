import { Component, OnInit } from '@angular/core';
import { CountryService } from './shared/county.service';
import { Country } from './shared/country';
import { Observable, Subject } from 'rxjs';

import {
  tap,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loading: boolean = false;
  countries$: Observable<Country[]>;
  private searchTerms = new Subject<string>();

  constructor(private countryService: CountryService) { }

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.countries$ = this.searchTerms.pipe(
      tap(_ => this.loading = true),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.countryService.searchCountry(term)),
      tap(_ => this.loading = false)
    )
  }

}
