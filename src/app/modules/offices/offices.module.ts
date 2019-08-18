import { NgModule } from '@angular/core';
import { OfficesComponent } from './components/offices/offices.component';
import { OfficeComponent } from './components/office/office.component';
import { OfficesListComponent } from './components/offices-list/offices-list.component';
import { OfficeFormComponent } from './components/office-form/office-form.component';
import { AddOfficeComponent } from './components/add-office/add-office.component';
import { SharedModule } from '../shared/shared.module';
import { OfficesRoutingModule } from './offices-routing.module';

@NgModule({
  declarations: [OfficesComponent, OfficeComponent, OfficesListComponent, OfficeFormComponent, AddOfficeComponent],
  imports: [
    OfficesRoutingModule,
    SharedModule
  ]
})
export class OfficesModule {
}
