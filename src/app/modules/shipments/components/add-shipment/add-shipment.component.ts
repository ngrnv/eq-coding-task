import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalLoaderService } from 'src/app/core/services/global-loader.service';

@Component({
  selector: 'eq-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.scss']
})
export class AddShipmentComponent implements OnInit {

  constructor(private router: Router, private loader: GlobalLoaderService) {
  }

  ngOnInit() {
  }

  onFormResult(result) {
    this.router.navigate(['/shipments', result.id]);
  }

  saving(loading: boolean) {
    this.loader.loading$.next(loading);
  }

}
