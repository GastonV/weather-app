export interface WeatherForecastResponse {
  properties: {
    timeseries: WeatherTimeSeries[]
  }
}

export interface WeatherForecast {
  time: string;
  temperature: number;
  humidity: number;
}

interface WeatherTimeSeries {
  time: string;
  data: WeatherTimeSeriesData
}

interface WeatherTimeSeriesData {
  instant: {
    details: WeatherTimeSeriesDataDetails
  }
}

interface WeatherTimeSeriesDataDetails {
  air_temperature: number;
  relative_humidity: number;
}
