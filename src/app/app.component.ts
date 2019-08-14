import { Component } from '@angular/core';
import { GlobalLoaderService } from './core/services/global-loader.service';

@Component({
  selector: 'eq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eq-coding-task';

  constructor(public loader: GlobalLoaderService) {
  }

}
