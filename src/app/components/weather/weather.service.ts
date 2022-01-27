import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { WeatherForecastResponse } from "../../models/weather.model";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  path = 'https://8l526ngysb.execute-api.eu-west-1.amazonaws.com/?';

  constructor(private http: HttpClient) {
  }

  getWeather(lat: string, long: string): Observable<WeatherForecastResponse> {
    const url = `${this.path}lat=${lat}&lon=${long}`;
    return this.http.get<WeatherForecastResponse>(url).pipe(take(1))
  }
}
