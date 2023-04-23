import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../interfaces/breadcrumb.interface';
import { Observable, map, skip } from 'rxjs';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent{
  
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$.pipe(
      map(res => res.slice(1)));
  }

}
