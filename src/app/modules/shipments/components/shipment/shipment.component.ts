import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Shipment } from 'src/app/models/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'eq-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {

  shipment$: Observable<Shipment>;

  constructor(private route: ActivatedRoute) {
    this.shipment$ = this.route.data.pipe(map(data => data.shipment));
  }

  ngOnInit() {
  }

}
