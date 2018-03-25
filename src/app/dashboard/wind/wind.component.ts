import {Component, Input, OnInit} from '@angular/core';
import {City} from "../../shared/model/city.model";

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {

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
    @Input() view

    colorScheme = {
        domain: ['#AAAAAA']
    };
    from;
    to;
    city: any;
    show: boolean = false
    weatherParam = "wind";

    ngOnInit() {

        this.setDataWeather(this.cities[0], this.weatherParam)
    }

    setDateFrom(date = this.dates[0]){
        this.from = date.target.value;
        this.calculateChartData({
            name: this.city.name,
            from: this.from,
            to: this.to,
            weatherParam: this.weatherParam
        });
    }
    setDateTo(date = this.dates[this.dates.length-1]){
        this.to = date.target.value;
        this.calculateChartData({
            name: this.city.name,
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
        this.city = city;
        this.setDataWeather(city, this.weatherParam);
    }
    tooggleButton(){
        this.show = !this.show;
    }

}
