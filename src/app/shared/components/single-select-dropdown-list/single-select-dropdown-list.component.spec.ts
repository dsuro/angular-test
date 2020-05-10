import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectDropdownListComponent } from './single-select-dropdown-list.component';

describe('SingleSelectDropdownListComponent', () => {
  let component: SingleSelectDropdownListComponent;
  let fixture: ComponentFixture<SingleSelectDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSelectDropdownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
