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

  constructor(private weatherService: WeatherService,
              ) { }

  dataWeather:any[] = [];
  temp: WeatherModel[] = [];
    chartData: any[] = [];

    cities = []

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
        //
        // {
        //     "name": "USA",
        //     "series": [
        //         {
        //             "name": "2010",
        //             "value": 7870000
        //         },
        //         {
        //             "name": "2011",
        //             "value": 8270000
        //         }
        //     ]
        // },
        //
        // {
        //     "name": "France",
        //     "series": [
        //         {
        //             "name": "2010",
        //             "value": 5000002
        //         },
        //         {
        //             "name": "2011",
        //             "value": 5800000
        //         }
        //     ]
        // }
    ]
    cityId: number = 0;
    date: [] = [];
    from;
    to;
  ngOnInit() {
      this.cities = this.weatherService.getCities()
      this.cityId = this.cities[0].id;
      this.setDataWeather(this.cityId);
  }

    setDataWeather(id){
        this.weatherService.getDataWeather(id)
            .subscribe((data) => {
                this.dataWeather = data.list;
                this.temp = this.dataWeather.map((item): WeatherModel => {
                    return item.main;
                });
                this.date = this.dataWeather.map((item): WeatherModel => {
                    return item.dt_txt;
                });
                this.from = this.date[1];
                this.to = this.date[this.date.length-1];
                this.calculateChartData(this.from, this.to)
                console.log(data)
                console.log(this.date)
            })
    }



    changeCity(city: City){
        console.log(city)
        this.setDataWeather(city.id)
    }
    calculateChartData(from, to){
        this.chartData = [];
        let temp = {};
        const date;
        this.dataWeather.forEach((t) => {
            console.log(t.temp)
            if(t.dt_txt.indexOf(from) !== -1){
                temp.from = t.main.temp;
            }
            if(t.dt_txt.indexOf(to) !== -1){
                temp.to = t.main.temp;
            }
            // console.log(t.temp)
        });
        console.log(temp.temp)
        this.date.forEach((d) => {
            // console.log(d)



        });

        this.chartData.push({
            "name": "Germany",
            "series": [
                {
                    "name": from,
                    "value": temp.from
                },
                {
                    "name": to,
                    "value": temp.to
                }
        })
        console.log(this.chartData)
        return this.chartData;

        // {
        //     "name": "Germany",
        //     "series": [
        //     {
        //         "name": "2010",
        //         "value": 7300000
        //     },
        //     {
        //         "name": "2011",
        //         "value": 8940000
        //     }
        // ]
        // },
    }

}
