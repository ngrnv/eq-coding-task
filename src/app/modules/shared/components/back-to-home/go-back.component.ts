import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eq-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent implements OnInit {

  @Input() path: string[] = ['../'];

  constructor() {
  }

  ngOnInit() {
  }

}
