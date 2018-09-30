import { EMPTY } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { debounceTime, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.pug',
  styleUrls: ['./search.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  players: any;
  isInProgress;
  errorMessage: any;

  constructor(
    private searchService: SearchService,
    private builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.builder.group({ query: [''] });
    this
      .form
      .get('query')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => { this.isInProgress = true; }),
        switchMap((text) => {

          this.errorMessage = '';

          if (!text) {
            this.isInProgress = false;
            return EMPTY;
          }

          return this
            .searchService
            .findUserByName(text)
            .pipe(
              tap((response: any) => {
                if (response.code) {
                  this.errorMessage = response.message;
                  this.isInProgress = false;
                  this.players = null;
                  return false;
                }

                this.players = response;
                this.isInProgress = false;
              }),
            );
        }),
      )
      .subscribe();
  }

}
