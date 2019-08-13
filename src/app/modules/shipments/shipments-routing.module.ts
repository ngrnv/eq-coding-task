import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsListComponent } from './components/shipments-list/shipments-list.component';
import { ShipmentsResolver } from './resolvers/shipments-resolver';


const routes: Routes = [
  {
    path: '',
    component: ShipmentsListComponent,
    resolve: { shipments: ShipmentsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentsRoutingModule {
}
