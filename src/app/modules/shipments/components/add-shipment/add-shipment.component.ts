import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/core/services/global-loader.service';
import { ShipmentsBackendService } from '../../../../core/services/backend/shipments-backend.service';
import { ShipmentDto } from 'src/app/models/models';

@Component({
  selector: 'eq-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.scss']
})
export class AddShipmentComponent implements OnInit {

  saving = false;

  constructor(private router: Router, private loader: GlobalLoaderService, private shipments: ShipmentsBackendService) {
  }

  ngOnInit() {
  }

  onFormResult(result: ShipmentDto) {
    this.saving = true;
    this.loader.loading$.next(true);
    this.shipments.addShipment(result).subscribe(res => {
      this.saving = false;
      this.loader.loading$.next(false);
      this.router.navigate(['/shipments', res.id]);
    });
  }

  onCancel() {
    this.router.navigate(['/shipments']);
  }

}
