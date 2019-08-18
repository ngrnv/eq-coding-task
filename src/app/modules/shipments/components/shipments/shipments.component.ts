import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eq-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  onAdd() {
    this.router.navigate(['/shipments/add']);
  }
}
