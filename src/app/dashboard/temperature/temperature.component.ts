import {Component, Input, OnInit} from '@angular/core';
import {City} from "../../shared/model/city.model";
import {WeatherModel} from "../../shared/model/weather.model";

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
    @Input() dataWeather: any[] = [];
  constructor() { }

  @Input() chartData;
  @Input() datesFrom;
  @Input() datesTo;

  view: any[] = [700, 400];

  colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
    @Input() setDataWeather

    @Input() weatherService
  @Input() calculateChartData1
    @Input() dates
    @Input() cities

  from
  to
    city
    weatherParam = "temp";

  ngOnInit() {
    console.log(this.weatherParam)

      this.setDataWeather(this.cities[0], this.weatherParam)
  }




    setDateFrom(date = this.dates[0]){
        this.from = date;
        this.calculateChartData1({
            name: this.city,
            from: this.from,
            to: this.to
            weatherParam: this.weatherParam
        })
        console.log(this.dataWeather)
    }

    setDateTo(date = this.dates[this.dates.length-1]){
        this.to = date;
        this.calculateChartData1({
            name: this.city,
            from: this.from,
            to: this.to,
            weatherParam: this.weatherParam
        })
        this.setToDefaultDates()
    }

    setToDefaultDates(){
        this.datesFrom = this.dataWeather.slice(0)
        this.datesTo = this.dataWeather.slice(this.dates[this.dates.length-1]);
    }

    changeCity(city: City){
        this.city = city.name;
        console.log(this.city)
        this.setDataWeather(city, this.weatherParam)
    }

}
