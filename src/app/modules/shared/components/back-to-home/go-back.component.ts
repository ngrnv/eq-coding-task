import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eq-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent implements OnInit {

  @Input() path: string[] = ['../'];
  @Input() icon = 'arrow-left';
  @Input() label = 'Go Back';

  constructor() {
  }

  ngOnInit() {
  }

}
