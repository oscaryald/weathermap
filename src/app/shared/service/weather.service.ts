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
        const url = 'http://localhost:3000/';
        return this.http.get(`${url}posts?posts=${weatherMap}`)
            .map((response: Response) => {
                const data = response.json()
                return data;
            })
    }

    // getDataWeather(weatherMap): Observable<any>{
    //     return this.http.get(`posts?posts=${weatherMap}`)
    // }



}