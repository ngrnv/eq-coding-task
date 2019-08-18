import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzButtonModule,
  NzCardModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzSpinModule,
  NzTableModule,
  NzSelectModule,
  NzMessageModule
} from 'ng-zorro-antd';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { GoBackComponent } from './components/back-to-home/go-back.component';
import { YesNoPipe } from './pipes/yes-no.pipe';

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
  NzDropDownModule,
  NzFormModule,
  NzSelectModule,
  NzMessageModule
];

const COMPONENTS = [
  LoaderComponent,
  PageNotFoundComponent,
  GoBackComponent
];

const PIPES = [
  YesNoPipe
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule {
}
