import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eq-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss']
})
export class ShipmentsListComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
