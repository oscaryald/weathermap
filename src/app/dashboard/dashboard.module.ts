import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {DashboardComponent} from './dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HumidityComponent } from './humidity/humidity.component';
import {WeatherService} from "../shared/service/weather.service";
import { PressureComponent } from './pressure/pressure.component';
import { WindComponent } from './wind/wind.component';

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
        HumidityComponent,
        PressureComponent,
        WindComponent
    ],
    providers:[
        WeatherService
    ]
})
export class DashboardModule{
}