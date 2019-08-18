import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShipmentsRoutingModule } from './shipments-routing.module';
import { ShipmentsListComponent } from './components/shipments-list/shipments-list.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { ShipmentComponent } from './components/shipment/shipment.component';

@NgModule({
  imports: [
    ShipmentsRoutingModule,
    SharedModule
  ],
  declarations: [ShipmentsListComponent, ShipmentsComponent, ShipmentComponent],
  providers: []
})
export class ShipmentsModule {
}
