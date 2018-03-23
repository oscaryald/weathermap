import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../shared/service/weather.service';
import {WeatherModel} from "../shared/model/weather.model";
import {City} from "../shared/model/city.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

    dataWeather: any[] = [];
    temp: WeatherModel[] = [];
    chartData: any[] = [];

    view: any[] = [700, 400];

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    city: string;
    dates = [];
    datesTo = [];
    datesFrom = [];

    from;
    to;

    ngOnInit() {
        this.cities = this.weatherService.getCities();
        console.log(this.cities)
        this.setDataWeather(this.cities[0]);
    }

    setDataWeather(city){
        this.weatherService.getDataWeather(city.id)
            .subscribe((data) => {
                this.dataWeather = data.list;
                this.temp = this.dataWeather.map((item): WeatherModel => {
                    return item.main;
                });
                this.dates = this.dataWeather.map((item) => {
                    return item.dt_txt;
                });
                this.from = this.dates[1];
                this.to = this.dates[this.dates.length-1];
                this.city = city.name;

                this.calculateChartData1({
                    name: this.city,
                    from: this.from,
                    to: this.to
                })
                console.log(data)
            })
    }

    changeCity(city: City){
        this.city = city.name;
        this.setDataWeather(city)
    }

    setDateFrom(date = this.dates[0]){
        this.from = date;
        this.calculateChartData1({
            name: this.city,
            from: this.from,
            to: this.to
        })
    }

    setDateTo(date = this.dates[this.dates.length-1]){
        this.to = date;
        this.calculateChartData1({
            name: this.city,
            from: this.from,
            to: this.to
        })
        this.setToDefaultDates()

    }

    setToDefaultDates(){
        this.datesFrom = this.dataWeather.slice(0)
        this.datesTo = this.dataWeather.slice(this.dates[this.dates.length-1]);
    }

    calculateChartData1(param){
        let name = param.name || this.cities[0].name;
        let from = param.from;
        let to = param.to;

        let fromIdx: number = 0;
        let toIdx: number = 0;


        const objectTemp = {}
        const arrTemp = [];
        const dataWeatherCopy = [];

        this.chartData = [];

        fromIdx = this.dataWeather.findIndex((el, i) =>{
            return el.dt_txt.indexOf(from) !== -1;
        });
        toIdx = this.dataWeather.findIndex((el, i) =>{
            return el.dt_txt.indexOf(to) !== -1;
        })

        this.datesFrom = this.dataWeather.slice(0, toIdx-1)
        this.datesTo = this.dataWeather.slice(fromIdx+1)

        if(fromIdx > toIdx){
            toIdx = this.dates.length-1
        }

        console.log(fromIdx, toIdx)

        dataWeatherCopy = this.dataWeather.slice(fromIdx, toIdx);
        objectTemp['series'] = [];

        console.log(dataWeatherCopy)

        dataWeatherCopy.forEach((el) => {
            objectTemp.name = name;
            objectTemp['series'].push(
                {
                    "name": el.dt_txt,
                    "value": el.main.temp
                }
            );
        });

        arrTemp.push(objectTemp);
        //
        console.log(arrTemp)
        return this.chartData = arrTemp;

    }


    showMessage({text}){
        const blockMessage = document.querySelector('.message');
        blockMessage.innerHTML = text;
    }

}
