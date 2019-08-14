import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {

  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

}
