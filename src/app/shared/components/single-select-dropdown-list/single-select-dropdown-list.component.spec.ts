import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component,Input,Output,EventEmitter, SimpleChange} from '@angular/core';
import { SingleSelectDropdownListComponent } from './single-select-dropdown-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { advance } from '../../testing/test-helper';
/*Mock Components */

@Component({
  selector: 'p-dropdown',
  template: '<p>Hello MockSingleSelectDropdownListComponent</p>',
})
export class MockPDropDownComponent {
  @Input() options:Array<any>;
  @Input() filter:Boolean;
  @Input() disabled:Boolean;
  @Input() showFilter:Boolean;
  @Input() resetFilterOnHide:Boolean;
  @Input() placeholder:String;
  @Output() onChange:EventEmitter<any>=new EventEmitter<any>();
}

/*Test Suite */
describe('Component::SingleSelectDropdownListComponent', () => {
  let component: SingleSelectDropdownListComponent;
  let fixture: ComponentFixture<SingleSelectDropdownListComponent>;
  const data=[
  {"label":"VW","value":"VW"},
  {"label":"Audi","value":"Audi"},
  {"label":"Renault","value":"Renault"},
  {"label":"BMW","value":"BMW"}
 ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
      declarations: [ 
        SingleSelectDropdownListComponent,
        MockPDropDownComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectDropdownListComponent);
    component = fixture.componentInstance;
    component.data=null;
    component.defaultValue=null;
    component.placeHolder=null;
    component.reset=null;
    component.showFilter=null;
    component.disabled=null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnChanges with valid data',fakeAsync(()=>{
    component.data=data;
    component.defaultValue="Audi";
    component.placeHolder="Select";
    component.reset=false;
    component.showFilter=true;
    component.disabled=false;
    component.ngOnChanges({
      data:new SimpleChange(null,component.data,true),
      defaultValue:new SimpleChange(null,component.defaultValue,true),
      placeHolder:new SimpleChange(null,component.placeHolder,true),
      reset:new SimpleChange(null,component.reset,true),
      showFilter:new SimpleChange(null,component.showFilter,true),
      disabled:new SimpleChange(null,component.disabled,true)
    });
    advance(fixture,105);
    fixture.whenStable().then(()=>{
      expect(component.dropdownData.length).toBeGreaterThan(0);
      expect(component.selectedItem).toBeDefined();
      expect(component.placeholderText).toBeDefined();
      expect(component.isDisabled).toBeFalsy();
      expect(component.showFilter).toBeTruthy();
    });
  }));

  it('should test ngOnChanges disabled and reset',fakeAsync(()=>{
    component.data=data;
    component.defaultValue=null;
    component.placeHolder="Select";
    component.reset=true;
    component.showFilter=true;
    component.disabled=true;
    component.ngOnChanges({
      data:new SimpleChange(null,component.data,true),
      defaultValue:new SimpleChange(null,component.defaultValue,true),
      placeHolder:new SimpleChange(null,component.placeHolder,true),
      reset:new SimpleChange(null,component.reset,true),
      showFilter:new SimpleChange(null,component.showFilter,true),
      disabled:new SimpleChange(null,component.disabled,true)
    });
    advance(fixture,105);
    fixture.whenStable().then(()=>{
      expect(component.dropdownData.length).toBeGreaterThan(0);
      expect(component.selectedItem).toBeNull();
      expect(component.isDisabled).toBeTruthy();
    });
  }));

  it('should test onItemChange', () => {
    spyOn(component.onItemSelected,'emit');
    component.selectedItem="BMW";
    component.onItemChange(null);
    fixture.detectChanges();
    expect(component.onItemSelected.emit).toHaveBeenCalled();
  });

  it('should test clearData',fakeAsync(()=>{
    component.data=data;
    component.clearData();
    advance(fixture,105);
    fixture.whenStable().then(()=>{
      expect(component.dropdownData.length).toBeGreaterThan(0);
      expect(component.selectedItem).toBeNull();
      expect(component.showDropdown).toBeTruthy();
    });
  }));
});
