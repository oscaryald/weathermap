import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {BaseApi} from "../core/base-api";


@Injectable()
export class WeatherService extends BaseApi{


    constructor(
        public http: Http,
    ){
        super(http)
    }


    getDataWeather(): Observable<any>{
        // const url = '//localhost:3000/';

        // return this.http.get(`${url}posts?posts=${weatherMap}`)
        //     .map((response: Response) => {
        //         const data = response.json()
        //         return data;
        //     })
        //
        const url = 'http://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1';
        //api.openweathermap.org/data/2.5/forecast?id=CITY_ID&units=metric&cnt=30&appid=YOUR-APP-ID
        return this.http.get(`${url}`)
            .map((response: Response) => {
                const data = response.json()
                return data;
            })


        
    }

    // getDataWeather(weatherMap): Observable<any>{
    //     return this.http.get(`posts?posts=${weatherMap}`)
    // }



}