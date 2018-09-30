import 'rxjs/add/operator/map';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ) { }

  prepareUserInfo(response, account_id) {
    const profile = response.data[account_id];
    
    return {
      ...profile,
      created_at: profile.created_at * 1000,
      last_battle_time: profile.last_battle_time * 1000,
    };
  }

  findUserByName(search) {
    if (!search) { return; }
    return this
      .http
      .get('account/list/', { params: { search, limit: '10' } })
      .map((response: any) => {

        if (response.status === 'error') {
          return response.error;
        }

        return response.data;
      });
  }

  getUserInfo(account_id) {
    if (!account_id) { return; }

    return this
      .http
      .get('account/info/', { params: { account_id } })
      .map((response: any) => this.prepareUserInfo(response, account_id));
  }
}
