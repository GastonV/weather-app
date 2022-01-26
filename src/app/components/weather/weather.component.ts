import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WeatherService } from './weather.service';
import { WeatherForecast } from "../../models/weather.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-weatherasd',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Time', 'Temperature', 'Humidity'];
  dataSource: WeatherForecast[] = [];
  weatherForm: FormGroup = new FormGroup({});
  weatherServiceSubscription: Subscription = new Subscription();

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.weatherServiceSubscription.unsubscribe();
  }

  getWeather(): void {
    if (!this.weatherForm.valid) {
      return;
    }

    const lat = this.weatherForm.value.latitude;
    const long = this.weatherForm.value.longitude;

    this.weatherServiceSubscription = this.weatherService.getWeather(lat, long).subscribe(res => {
      this.dataSource = res.properties.timeseries.map(forecast => {
        return {
          time: forecast.time,
          temperature: forecast.data.instant.details.air_temperature,
          humidity: forecast.data.instant.details.relative_humidity
        }
      });
    })
  }

  buildForm(): void {
    this.weatherForm = this.fb.group({
      // TODO initial value for GEO
      latitude: ["", [Validators.required, Validators.max(90), Validators.min(-90)]],
      longitude: ["", [Validators.required, Validators.max(180), Validators.min(-180)]],
    })
  }
}
