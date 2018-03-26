import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../shared/service/weather.service';
import {City} from "../shared/model/city.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(public weatherService: WeatherService) { }

    dataWeather: any[] = [];
    chartData: any[] = [];
    city: City;
    dates = [];
    datesTo = [];
    datesFrom = [];
    cities: City[] = [];
    from = null;
    to = null;
    isLoaded: boolean = false;
    view: any[] = [560, 400];

    ngOnInit() {
        this.cities = this.weatherService.getCities();
    }

    setDataWeather(city, weatherParam){
        this.weatherService.getDataWeather(city.id)
            .subscribe((data) => {
                this.dataWeather = data['list'];
                this.dates = this.dataWeather.map((item) => {
                    return item.dt_txt;
                });
                this.from = this.dates[0];
                this.to = this.dates[this.dates.length-1];
                this.city = city;
                this.calculateChartData({
                    name: this.city['name'] ,
                    from: this.from,
                    to: this.to,
                    weatherParam: weatherParam
                });
                this.isLoaded = true;
            });
    }

    calculateChartData(param){
        let name = param.name || this.cities[0].name,
            from = param.from,
            to = param.to,
            weatherParam = param.weatherParam;

        let fromIdx: number = 0,
            toIdx: number = 0,
            objectTemp = {},
            arrTemp = [],
            dataWeatherCopy = [];

        fromIdx = this.dataWeather.findIndex((el) => el.dt_txt.indexOf(from) !== -1);
        toIdx = this.dataWeather.findIndex((el) => el.dt_txt.indexOf(to) !== -1);

        this.datesFrom = this.dataWeather.slice(0, this.dates.length-1);
        this.datesTo = this.dataWeather.slice(fromIdx+1);

        if(fromIdx >= toIdx){
            toIdx = this.dates.length-1;
        }
        if(fromIdx < 0){
            fromIdx = 0;
        }

        dataWeatherCopy = this.dataWeather.slice(fromIdx, toIdx+1);
        objectTemp['series'] = [];

        dataWeatherCopy.forEach((el) => {
            let weatherValue = (weatherParam === 'wind') ? el.wind.speed : el['main'][weatherParam];
            objectTemp['name'] = name;
            objectTemp['series'].push(
                {
                    "name": el.dt_txt,
                    "value": weatherValue
                }
            );
        });
        arrTemp.push(objectTemp);
        return this.chartData = arrTemp;
    }
}
