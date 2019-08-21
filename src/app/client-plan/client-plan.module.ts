import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientPlanComponent} from './client-plan.component';
import {ClientPlanRouting} from './client-plan.routing';
import { ClientMapComponent } from './client-map/client-map.component';
import { PopupTableInfoComponent } from './_popups/popup-table-info/popup-table-info.component';

@NgModule({
  declarations: [ClientPlanComponent, ClientMapComponent, PopupTableInfoComponent],
  imports: [
    CommonModule,
    ClientPlanRouting
  ]
})
export class ClientPlanModule {
}
