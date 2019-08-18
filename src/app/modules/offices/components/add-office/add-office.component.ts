import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalLoaderService } from '../../../../core/services/global-loader.service';
import { OfficesBackendService } from '../../../../core/services/backend/offices-backend.service';
import { Office } from '../../../../models/models';

@Component({
  selector: 'eq-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.scss']
})
export class AddOfficeComponent implements OnInit {

  saving = false;

  constructor(private router: Router, private loader: GlobalLoaderService, private offices: OfficesBackendService) {
  }

  ngOnInit() {
  }

  onFormResult(result: Office) {
    this.saving = true;
    this.loader.loading$.next(true);
    this.offices.addOffice(result).subscribe(res => {
      this.saving = false;
      this.loader.loading$.next(false);
      this.router.navigate(['/offices', res.id]);
    });
  }

  onCancel() {
    this.router.navigate(['/offices']);
  }

}
