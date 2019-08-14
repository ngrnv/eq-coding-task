import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzCardModule, NzIconModule, NzInputModule, NzSpinModule, NzTableModule } from 'ng-zorro-antd';
import { LoaderComponent } from './components/loader/loader.component';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NzButtonModule,
  NzCardModule,
  NzInputModule,
  NzSpinModule,
  NzIconModule,
  NzTableModule
];

const DECLARATIONS = [
  LoaderComponent
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
