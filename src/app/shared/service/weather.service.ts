import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {CITIES} from "../city-list/sity-list";
import {City} from "../model/city.model";

@Injectable()
export class WeatherService{

    constructor(
        private http: HttpClient,
    ){}

    getCities(): City[] {
            console.log(CITIES)
        return CITIES
    }

    getDataWeather(id){
        const url = `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&cnt=30&appid=7bcd39ab5ccaa97088d0b3bc2bf64933`;
        return this.http.get(`${url}`);
    }

}