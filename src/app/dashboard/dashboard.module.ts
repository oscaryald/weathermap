import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {DashboardComponent} from './dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';

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
        TemperatureComponent
    ],
    providers:[

    ]
})
export class DashboardModule{
}