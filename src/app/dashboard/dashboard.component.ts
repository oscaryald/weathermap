import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../shared/service/weather.service';
import {TemperatureModel} from "../shared/model/temperature.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  dataWeather:any[] = [];
  temp: TemperatureModel[] = [];
    chartData: any[] = [];

    view: any[] = [700, 400];

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    multi = [
        {
            "name": "Germany",
            "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
            ]
        },

        {
            "name": "USA",
            "series": [
                {
                    "name": "2010",
                    "value": 7870000
                },
                {
                    "name": "2011",
                    "value": 8270000
                }
            ]
        },

        {
            "name": "France",
            "series": [
                {
                    "name": "2010",
                    "value": 5000002
                },
                {
                    "name": "2011",
                    "value": 5800000
                }
            ]
        }
    ]

  ngOnInit() {


    this.weatherService.getDataWeather()
        .subscribe((data) => {
            this.dataWeather = data.list;

            this.temp = this.dataWeather.map((item) => {
                console.log(item.temp);
                return item.temp;
            });
            // this.calculateChartData()
            // console.log(this.temp)
            console.log(data)
        })
  }
    calculateChartData(){
        // this.chartData = [];
        // this.categories.forEach((cat) => {
        //     const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
        //     const catValue = catEvent.reduce((total, e) => {
        //         total += e.amount;
        //         return total;
        //     }, 0);
        //     this.chartData.push({
        //         name: cat.name,
        //         value: catValue
        //     });
        // });
        // return this.chartData;
    }

}
