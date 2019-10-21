import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CountryService {
  endpoint: string = "https://restcountries.eu/rest/v2/name/";

  constructor(private http: HttpClient) { }

  searchCountry(term: string): Observable<Country[]> {
    let url = `${this.endpoint}${term}`;
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(this.handleError<Country[]>('countries', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }

}