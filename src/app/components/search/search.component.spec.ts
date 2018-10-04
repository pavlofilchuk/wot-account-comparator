import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let searchService;
  let router;

  const fakeSearchService = jasmine.createSpyObj('SearchService', ['findUserByName']);
  fakeSearchService.findUserByName.and.returnValue({
    pipe: () => {}
  });

  const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
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
          provide: Router,
          useValue: fakeRouter,
        },
        FormBuilder,
      ],
      imports: [
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.get(SearchService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user', () => {
    component.showUser(123);
    expect(router.navigate).toHaveBeenCalledWith(['user/123']);
  });
});
