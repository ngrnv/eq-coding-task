import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShipmentsRoutingModule } from './shipments-routing.module';
import { ShipmentsListComponent } from './components/shipments-list/shipments-list.component';
import { ShipmentsResolver } from './resolvers/shipments-resolver';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { ShipmentComponent } from './components/shipment/shipment.component';


@NgModule({
  imports: [
    ShipmentsRoutingModule,
    SharedModule
  ],
  declarations: [ShipmentsListComponent, ShipmentsComponent, ShipmentComponent],
  providers: [ShipmentsResolver]
})
export class ShipmentsModule {
}
