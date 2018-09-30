import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.pug',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {
  first;
  second;

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit() {
  }

  onUserIdChange(id, name) {
    this.searchService.getUserInfo(id).subscribe(
      (response) => {
        this[name] = response;

        switch(name) {
          case 'first': {
            this.searchService.store[0] = response;
            break;
          }
          case 'second': {
            this.searchService.store[1] = response;
            break;
          }
        }
      }
    )
  }

}
