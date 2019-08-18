import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eq-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onAdd() {
    this.router.navigate(['/offices/add']);
  }

}
