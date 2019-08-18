import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsListComponent } from './components/shipments-list/shipments-list.component';
import { ShipmentsResolver } from './resolvers/shipments-resolver';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { ShipmentComponent } from './components/shipment/shipment.component';


const routes: Routes = [
  {
    path: '',
    component: ShipmentsComponent,
    resolve: { shipments: ShipmentsResolver }
  },
  {
    path: ':id',
    component: ShipmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentsRoutingModule {
}
