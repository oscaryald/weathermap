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


    getDataWeather(weatherMap): Observable<any>{
        // const url = '//localhost:3000/';
        //
        // return this.http.get(`${url}posts?posts=${weatherMap}`)
        //     .map((response: Response) => {
        //         const data = response.json()
        //         return data;
        //     })
        
        const url = 'http://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22';
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