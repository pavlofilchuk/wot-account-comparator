import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.pug',
  styleUrls: ['./user-info.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit {

  user: any;
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
  ) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.user = this.route.snapshot.data.user;
    });

    this.stats = this.user.statistics['all'];
  }

  onSelect(value) {
    this.stats = this.user.statistics[value];
  }

  onClear() {
    this.stats = this.user.statistics['all'];
  }

}
