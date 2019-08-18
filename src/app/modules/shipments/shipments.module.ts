import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShipmentsRoutingModule } from './shipments-routing.module';
import { ShipmentsListComponent } from './components/shipments-list/shipments-list.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { ShipmentComponent } from './components/shipment/shipment.component';
import { AddShipmentComponent } from './components/add-shipment/add-shipment.component';
import { ShipmentFormComponent } from './components/shipment-form/shipment-form.component';

@NgModule({
  imports: [
    ShipmentsRoutingModule,
    SharedModule
  ],
  declarations: [ShipmentsListComponent, ShipmentsComponent, ShipmentComponent, AddShipmentComponent, ShipmentFormComponent],
  providers: []
})
export class ShipmentsModule {
}
