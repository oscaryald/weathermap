import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../shared/service/weather.service';
import {WeatherModel} from "../shared/model/weather.model";
import {City} from "../shared/model/city.model";
import {TemperatureComponent} from "./temperature/temperature.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

    dataWeather: any[] = [];
    temp: WeatherModel[] = [];
    chartData: any[] = [];

    city: string;
    dates = [];
    datesTo = [];
    datesFrom = [];
    cities = [];

    from;
    to;


    ngOnInit() {
        this.cities = this.weatherService.getCities();
        // this.setDataWeather(this.cities[0]);
    }

    setDataWeather(city, weatherParam){
        this.weatherService.getDataWeather(city.id)
            .subscribe((data) => {
                this.dataWeather = data.list;
                this.temp = this.dataWeather.map((item): WeatherModel => {
                    return item.main.temp;
                });
                this.dates = this.dataWeather.map((item) => {
                    return item.dt_txt;
                });

                this.from = this.from || this.dates[1];
                this.to = this.to || this.dates[this.dates.length-1];
                this.city = city.name;

                this.calculateChartData1({
                    name: this.city,
                    from: this.from,
                    to: this.to,
                    weatherParam: weatherParam
                })
            })
    }

    calculateChartData1(param){
        let name = param.name || this.cities[0].name;
        let from = param.from;
        let to = param.to;
        let weatherParam = param.weatherParam;
        let fromIdx: number = 0;
        let toIdx: number = 0;
        const objectTemp = {}
        const arrTemp = [];
        let dataWeatherCopy = [];

        this.chartData = [];

        fromIdx = this.dataWeather.findIndex((el, i) =>{
            return el.dt_txt.indexOf(from) !== -1;
        });
        toIdx = this.dataWeather.findIndex((el, i) =>{
            return el.dt_txt.indexOf(to) !== -1;
        })

        this.datesFrom = this.dataWeather.slice(0, toIdx-1)
        this.datesTo = this.dataWeather.slice(fromIdx+1)

        if(fromIdx >= toIdx){
            toIdx = this.dates.length-1
        }

        console.log(fromIdx, toIdx)

        dataWeatherCopy = this.dataWeather.slice(fromIdx, toIdx);
        objectTemp['series'] = [];

        dataWeatherCopy.forEach((el) => {
            let weatherValue = (weatherParam === 'wind') ? el.wind.speed : el['main'][weatherParam];
            objectTemp.name = name;
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
