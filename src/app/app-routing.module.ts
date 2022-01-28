import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WeatherComponent } from "./components/weather/weather.component";

const routes: Routes = [
  { path: 'weather-forecast', component: WeatherComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
