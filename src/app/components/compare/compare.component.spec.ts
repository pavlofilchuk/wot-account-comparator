import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareComponent } from './compare.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;

  let searchService;

  const fakeSearchService = jasmine.createSpyObj('SearchService', ['getUserInfo']);
  fakeSearchService.getUserInfo.and.returnValue({
    subscribe: () => {}
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { 
          provide: SearchService,
          useValue: fakeSearchService,
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    searchService = TestBed.get(SearchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user info', () => {
    component.onUserIdChange(123, 'first');
    expect(searchService.getUserInfo).toHaveBeenCalledWith(123);
  });
});
