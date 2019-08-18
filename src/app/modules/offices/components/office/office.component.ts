import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficesBackendService } from 'src/app/core/services/backend/offices-backend.service';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Office } from '../../../../models/models';

@Component({
  selector: 'eq-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  office$: Observable<Office>;

  editMode = false;
  processing = false;

  reload$ = new BehaviorSubject(null);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private offices: OfficesBackendService) {
    this.office$ = combineLatest(
      this.route.data.pipe(map(data => data.office)),
      this.reload$.pipe(
        tap(() => this.processing = true),
        switchMap(id => id ? this.offices.getOfficetById(id) : of(null)),
        tap(() => this.processing = false),
      )
    ).pipe(
      map(([office, reloaded]) => reloaded ? reloaded : office)
    );
  }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
  }

  onDelete(id: string) {
    this.processing = true;
    this.offices.deleteOffice(id).pipe(tap(() => this.processing = false))
      .subscribe(res => {
        this.router.navigate(['/offices']);
      });
  }

  onResult(office: Office) {
    this.processing = true;
    this.offices.editOffice(office).pipe(
      tap(res => {
        this.processing = false;
        this.editMode = false;
        this.reload$.next(res.id);
      }),
    ).subscribe();
  }

  onCancel() {
    this.editMode = false;
  }

}
