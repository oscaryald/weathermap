import {Component, Input, OnInit} from '@angular/core';
import {City} from "../../shared/model/city.model";

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnInit {

    constructor() { }

    @Input() chartData;
    @Input() datesFrom;
    @Input() datesTo;
    @Input() setDataWeather;
    @Input() weatherService;
    @Input() calculateChartData;
    @Input() dates;
    @Input() cities;
    @Input() dataWeather;
    view: any[] = [700, 400];
    colorScheme = {
        domain: ['#5AA454']
    };
    from;
    to;
    city;
    weatherParam = "pressure";

    ngOnInit() {
        this.setDataWeather(this.cities[0], this.weatherParam)
    }

    setDateFrom(date = this.dates[0]){
        this.from = date;
        this.calculateChartData({
            name: this.city,
            from: this.from,
            to: this.to,
            weatherParam: this.weatherParam
        })
    }

    setDateTo(date = this.dates[this.dates.length-1]){
        this.to = date;
        this.calculateChartData({
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
        this.setDataWeather(city, this.weatherParam)
    }

}
