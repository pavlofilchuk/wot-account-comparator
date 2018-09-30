import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

import { SearchService } from '../services/search/search.service';

@Injectable()
export class UserInfoResolve implements Resolve<any> {
  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;

    if (!id) { return false; }

    return this.searchService.getUserInfo(id).catch(
      (error) => {
        console.warn(error);
        this.router.navigate(['/']);
        return EMPTY;
      },
    );
  }
}
