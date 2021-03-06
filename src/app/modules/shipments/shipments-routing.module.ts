import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsResolver } from './resolvers/shipments-resolver';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { ShipmentComponent } from './components/shipment/shipment.component';
import { ShipmentResolver } from './resolvers/shipment-resolver';
import { AddShipmentComponent } from './components/add-shipment/add-shipment.component';


const routes: Routes = [
  {
    path: '',
    component: ShipmentsComponent,
    resolve: { shipments: ShipmentsResolver }
  },
  {
    path: 'add',
    component: AddShipmentComponent,
  },
  {
    path: ':id',
    component: ShipmentComponent,
    resolve: { shipment: ShipmentResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ShipmentsResolver, ShipmentResolver]
})
export class ShipmentsRoutingModule {
}
