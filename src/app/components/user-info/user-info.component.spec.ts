import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { of } from 'rxjs';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  let searchService;
  let route;

  const fakeSearchService = jasmine.createSpyObj('SearchService', ['compare']);

  const fakeActivatedRoute = {
    params: {
      subscribe: () => of()
    },
    snapshot: {
      data: {
        user: {
          statistics: {
            all: {}
          }
        }
      }
    }
  }
  
  beforeEach(async(() => {

    spyOn(fakeActivatedRoute.params, 'subscribe');

    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { 
          provide: SearchService,
          useValue: fakeSearchService,
        },
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    searchService = TestBed.get(SearchService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(route.params.subscribe).toHaveBeenCalled();
  });

  it('should select', fakeAsync(() => {
    expect(component.onSelect).toBeTruthy({});
  }));

  it('onClear', () => {
    expect(component.onClear).toBeTruthy({});
  });

  it('compare', () => {
    expect(component.compare).toBeTruthy();
  });
});
