import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Office } from '../../../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateAllFormFields } from '../../../../core/utils';

@Component({
  selector: 'eq-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {

  @Input() office: Office;
  @Input() saving = false;

  @Output() formResult = new EventEmitter<Office>();
  @Output() cancel = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.office) {
      this.form = this.fb.group({
        id: [this.office.id],
        PLZ: [this.office.PLZ, [Validators.required]],
        name: [this.office.name, [Validators.required]]
      });
    } else {
      this.form = this.fb.group({
        id: [null],
        PLZ: [null, [Validators.required]],
        name: [null, [Validators.required]]
      });
    }
  }

  submitForm() {
    validateAllFormFields(this.form);
    if (this.form.invalid) {
      return;
    }
    this.formResult.emit(this.form.getRawValue());
  }

  onCancel() {
    this.cancel.emit(true);
  }

}
