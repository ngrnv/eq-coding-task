import { Component, OnInit } from '@angular/core';
import { ShipmentsBackendService } from 'src/app/core/services/backend/shipments-backend.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'eq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  shipmentId;
  processing = false;

  constructor(private shipments: ShipmentsBackendService, private router: Router, private messages: NzMessageService) {
  }

  ngOnInit() {
  }

  subscriptionSearch() {
    this.processing = true;
    this.shipments.getShipmentById(this.shipmentId).subscribe(
      res => {
        this.processing = false;
        this.router.navigate(['/shipments', res.id]);
      },
      err => {
        this.processing = false;
        this.messages.info(`Shipment with id ${this.shipmentId} not found`);
      }
    );
  }

}
