import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzCardModule, NzDropDownModule, NzIconModule, NzInputModule, NzSpinModule, NzTableModule } from 'ng-zorro-antd';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NzButtonModule,
  NzCardModule,
  NzInputModule,
  NzSpinModule,
  NzIconModule,
  NzTableModule,
  NzDropDownModule
];

const DECLARATIONS = [
  LoaderComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [...DECLARATIONS],
  exports: [
    ...MODULES,
    ...DECLARATIONS
  ]
})
export class SharedModule {
}
