import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficesComponent } from './components/offices/offices.component';
import { OfficeResolver } from './resolvers/office-resolver';
import { OfficesResolver } from './resolvers/offices-resolver';
import { OfficeComponent } from './components/office/office.component';
import { AddOfficeComponent } from './components/add-office/add-office.component';


const routes: Routes = [
  {
    path: '',
    component: OfficesComponent,
    resolve: { offices: OfficesResolver }
  },
  {
    path: 'add',
    component: AddOfficeComponent,
  },
  {
    path: ':id',
    component: OfficeComponent,
    resolve: { office: OfficeResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OfficesResolver, OfficeResolver]
})
export class OfficesRoutingModule {
}
