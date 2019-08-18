import { Component, OnInit } from '@angular/core';
import { ShipmentsBackendService } from 'src/app/core/services/backend/shipments-backend.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { OfficesBackendService } from '../../../core/services/backend/offices-backend.service';

@Component({
  selector: 'eq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  shipmentId;
  processingShipments = false;

  zip;
  processingOffices = false;

  constructor(private shipments: ShipmentsBackendService,
              private offices: OfficesBackendService,
              private router: Router,
              private messages: NzMessageService) {
  }

  ngOnInit() {
  }

  subscriptionSearch() {
    this.processingShipments = true;
    this.shipments.getShipmentById(this.shipmentId).subscribe(
      res => {
        this.processingShipments = false;
        this.router.navigate(['/shipments', res.id]);
      },
      err => {
        this.processingShipments = false;
        this.messages.info(`Shipment with id ${this.shipmentId} not found`);
      }
    );
  }

  officeSearch() {
    this.processingOffices = true;
    this.offices.getOfficetByZIP(this.zip).subscribe(
      res => {
        this.processingOffices = false;
        this.router.navigate(['/offices', res.id]);
      },
      err => {
        this.processingOffices = false;
        this.messages.info(`Office with ZIP ${this.zip} not found`);
      }
    );
  }

}
