import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

import { WeatherService } from './weather.service';
import { WeatherForecast } from "../../models/weather.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})

export class WeatherComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false })

  set paginator(paginator: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = paginator;
    }
  }

  displayedColumns: string[] = ['Time', 'Temperature', 'Humidity'];
  dataSource: MatTableDataSource<WeatherForecast>;
  weatherForm: FormGroup = new FormGroup({});
  weatherServiceSubscription: Subscription = new Subscription();
  dataLoading: boolean = true;

  show: string = "show";
  spinner: boolean = false;

  constructor(private weatherService: WeatherService, private fb: FormBuilder, private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource<WeatherForecast>([]);
  }

  ngOnInit(): void {
    this.buildForm();
    navigator.geolocation.getCurrentPosition(() => {
    }, () => {
      alert('User not allowed')
    }, { timeout: 10000 })
  }

  ngOnDestroy(): void {
    this.weatherServiceSubscription.unsubscribe();
  }

  getWeather(): void {
    if (!this.weatherForm.valid) {
      return;
    }

    this.spinner = true;
    this.show = "show"
    const lat = this.weatherForm.value.latitude;
    const long = this.weatherForm.value.longitude;

    setTimeout(() => {
      this.weatherServiceSubscription = this.weatherService.getWeather(lat, long).subscribe(res => {
        this.dataSource.data = res.properties.timeseries.map(forecast => {
          return {
            time: forecast.time,
            temperature: forecast.data.instant.details.air_temperature,
            humidity: forecast.data.instant.details.relative_humidity
          }
        });
        this.dataSource.sort = this.sort;
      })

      this.dataLoading = false;
      this.show = ""
      this.spinner = false;

    }, 500)
  }

  buildForm(): void {
    this.weatherForm = this.fb.group({
      // TODO initial value for GEO
      latitude: ["" || null, [Validators.required, Validators.max(90), Validators.min(-90)]],
      longitude: ["", [Validators.required, Validators.max(180), Validators.min(-180)]],
    })
  }
}
