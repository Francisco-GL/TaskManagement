import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClimaI } from '../Models/Clima';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  API_KEY: string = 'de7b6ac8cd2f266ef8a011b9e9aae9a4';
  URL_CLIMA: string = `https://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}&units=metric&q=`;
  URL_CLIMAXML: string = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

  constructor(private http: HttpClient) { }

  getClima(cityName: string, countryCode: string):Observable<ClimaI>{
    return this.http.get<ClimaI>(`${this.URL_CLIMA}${cityName},${countryCode}`);
  }
}
