import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Office, Shipment, ShipmentDto } from 'src/app/models/models';
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
  @Input() saving = false;

  @Output() formResult = new EventEmitter<ShipmentDto>();
  @Output() cancel = new EventEmitter<boolean>();

  form: FormGroup;

  offices$: Observable<Office[]>;
  loadingOffices = false;

  constructor(private fb: FormBuilder,
              private offices: OfficesBackendService) {
    this.loadingOffices = true;
    this.offices$ = this.offices.getAllOffices().pipe(tap(() => this.loadingOffices = false));
  }

  ngOnInit() {
    if (this.shipment) {
      this.form = this.fb.group({
        id: [this.shipment.id, [Validators.required]],
        type: [this.shipment.type.id, [Validators.required]],
        origin: [this.shipment.origin, [Validators.required]],
        destination: [this.shipment.destination, [Validators.required]],
        delivered: [this.shipment.delivered, [Validators.required]],
        weight: [this.shipment.weight.id, [Validators.required]],
        office: [this.shipment.office.id, [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        id: [null],
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
      console.log('invalid form', this.form);
      return;
    }
    this.formResult.emit(this.form.getRawValue());
  }

  onCancel() {
    this.cancel.emit(true);
  }
}
