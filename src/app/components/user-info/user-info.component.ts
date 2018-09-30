import { Component, OnInit, ViewEncapsulation, Input, OnChanges  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.pug',
  styleUrls: ['./user-info.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() userData;
  
  isCompareProcess = false;
  user: any = {};
  stats: any = {};
  statsTypes = [
    'all',
    'clan',
    'company',
    'historical',
    'regular_team',
    'stronghold_defense',
    'stronghold_skirmish',
    'team'
  ];
  selectedCategory: any = 'all';

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      if (this.route.snapshot.data.user) {
        this.user = this.route.snapshot.data.user;
        this.stats = this.user.statistics['all'];
      }
    });
  }

  ngOnChanges(changes) {
    const user = changes.userData;

    if (user.currentValue) {
      this.isCompareProcess = true;
      this.user = user.currentValue;
      this.stats = this.user.statistics['all'];
    }
  }

  onSelect(value) {
    this.stats = this.user.statistics[value];
  }

  onClear() {
    this.stats = this.user.statistics['all'];
  }

  compare(id, name, useStats) {
    if (!this.isCompareProcess) { return; }
    return this.searchService.compare(id, name, useStats, this.selectedCategory);
  }

}
