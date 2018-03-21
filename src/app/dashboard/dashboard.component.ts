import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../shared/service/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  dataWeather = []


  ngOnInit() {
    this.weatherService.getDataWeather(1)
        .subscribe((data) => {
            this.dataWeather = data;
        })
  }

}
