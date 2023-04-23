import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';

import { Breadcrumb } from "../interfaces/breadcrumb.interface";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  public readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {

        const root = this.router.routerState.snapshot.root;

        const breadcrumbs: Breadcrumb[] = [];

        this.addBreadcrumb(root, [], breadcrumbs);

        this._breadcrumbs$.next(breadcrumbs);
      }
    })
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabelRoute(route.data),
          url: '/' + routeUrl.join('/')
        };

        breadcrumbs.push(breadcrumb)
      }

      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabelRoute(data: Data) {
    return typeof data['breadcrumb'] === 'function' ? data["breadcrumb"](data) : data['breadcrumb'];
  }
}
