import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzCardModule, NzDropDownModule, NzIconModule, NzInputModule, NzSpinModule, NzTableModule } from 'ng-zorro-antd';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { BackToHomeComponent } from './components/back-to-home/back-to-home.component';
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
  NzDropDownModule
];

const COMPONENTS = [
  LoaderComponent,
  PageNotFoundComponent,
  BackToHomeComponent
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
