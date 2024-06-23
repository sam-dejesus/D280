import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://api.worldbank.org/v2/country'

  constructor(private http: HttpClient) {}

  getCountryData(countryCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${countryCode}?format=json`)
  }
}
