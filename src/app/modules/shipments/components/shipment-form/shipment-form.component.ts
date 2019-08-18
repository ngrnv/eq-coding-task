import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Office, Shipment } from 'src/app/models/models';
import { OfficesBackendService } from '../../../../core/services/backend/offices-backend.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { validateAllFormFields } from 'src/app/core/utils';
import { ShipmentsBackendService } from '../../../../core/services/backend/shipments-backend.service';

@Component({
  selector: 'eq-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss']
})
export class ShipmentFormComponent implements OnInit {

  @Input() shipment: Shipment;

  @Output() formSaving = new EventEmitter();
  @Output() formResult = new EventEmitter();

  form: FormGroup;

  offices$: Observable<Office[]>;
  loadingOffices = false;
  saving = false;

  constructor(private fb: FormBuilder,
              private offices: OfficesBackendService,
              private shipments: ShipmentsBackendService) {
    this.loadingOffices = true;
    this.offices$ = this.offices.getAllOffices().pipe(tap(() => this.loadingOffices = false));
  }

  ngOnInit() {
    if (this.shipment) {
      this.form = this.fb.group({
        type: [this.shipment.type, [Validators.required]],
        origin: [this.shipment.origin, [Validators.required]],
        destination: [this.shipment.destination, [Validators.required]],
        delivered: [this.shipment.delivered, [Validators.required]],
        weight: [this.shipment.weight, [Validators.required]],
        office: [this.shipment.office, [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        type: [null, [Validators.required]],
        origin: [null, [Validators.required]],
        destination: [null, [Validators.required]],
        delivered: [null, [Validators.required]],
        weight: [null, [Validators.required]],
        office: [null, [Validators.required]],
      });
    }
  }

  submitForm() {
    validateAllFormFields(this.form);
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    this.formSaving.emit(true);
    this.shipments.addShipment(this.form.getRawValue()).subscribe(res => {
      this.saving = false;
      this.formSaving.emit(false);
      this.formResult.emit(res);
    });
  }
}
