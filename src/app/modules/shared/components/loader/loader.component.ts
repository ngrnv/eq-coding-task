import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eq-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() show = false;
  @Input() overlay = false;
  @Input() global = false;

  constructor() {
  }

  ngOnInit() {
  }

}
