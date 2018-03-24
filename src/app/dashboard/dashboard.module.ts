import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {DashboardComponent} from './dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HumidityComponent } from './humidity/humidity.component';
import {WeatherService} from "../shared/service/weather.service";

@NgModule({
    imports:[
        CommonModule,
        NgxChartsModule
    ],
    exports:[
        NgxChartsModule
    ],
    declarations:[
        DashboardComponent,
        TemperatureComponent,
        HumidityComponent
    ],
    providers:[
        WeatherService
    ]
})
export class DashboardModule{
}