import 'rxjs/add/operator/map';
import { partition, compact, maxBy } from 'lodash-es';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  
  store = [];

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

  compare(current_user_id, field_name, useStats?, selectedCategory?) {
    if (!this.store.length) { return; }

    const store = compact(this.store);

    if (store.length !== 2) { return; }

    const splited = partition(store, (user) => {
      return user.account_id === current_user_id; 
    });

    const current = splited[0];
    const others = splited[1];

    if (!useStats) {
      return {
        'isBigger': current[0][field_name] > others[0][field_name],
        'isSmaller': current[0][field_name] < others[0][field_name],
      };
    } else {
      return {
        'isBigger': current[0]['statistics'][selectedCategory][field_name] > others[0]['statistics'][selectedCategory][field_name],
        'isSmaller': current[0]['statistics'][selectedCategory][field_name] < others[0]['statistics'][selectedCategory][field_name],
      };
    }
  }
}
