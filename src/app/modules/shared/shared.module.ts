import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule, NzInputModule, NzButtonModule } from 'ng-zorro-antd';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NzButtonModule,
  NzCardModule,
  NzInputModule
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule {
}
