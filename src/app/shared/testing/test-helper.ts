import { Component, OnInit,Input,Output,EventEmitter, Pipe, PipeTransform } from '@angular/core';
import {tick,TestBed} from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { defer } from 'rxjs';
  
export function advance(fixture: ComponentFixture<any>): void {
    tick();
    fixture.detectChanges();
}
  /*
 * Utility functions for our browser tests
 */
export function createEvent(eventType: any): Event {
    var evt: Event = document.createEvent('Event');
    evt.initEvent(eventType, true, true);
    return evt;
}
  
export function dispatchEvent(element: any, eventType: any) {
    element.dispatchEvent(createEvent(eventType));
}
  /** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}
/** Create async observable error that errors
 *  after a JS engine turn */
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

/*Mock Components */

@Component({
    selector: 'single-select-dropdown-list',
    template: '<p>Hello MockSingleSelectDropdownListComponent</p>',
  })
  export class MockSingleSelectDropdownListComponent {
    @Input() data:Array<any>;
    @Input() defaultValue:any;
    @Input() reset:Boolean;
    @Input() disabled:Boolean;
    @Input() showFilter:Boolean;
    @Input() placeHolder:String;
    @Output() onItemSelected:EventEmitter<any>=new EventEmitter<any>();
  }

  
@Component({
    selector: 'p-table',
    template: '<p>Hello MockSingleSelectDropdownListComponent</p>',
  })
  export class MockPrimeTableComponent {
    @Input() value:Array<any>;
  }

/*Mock Pipes*/
@Pipe({
    name: 'carColor'
  })
  export class MockCarColorPipe implements PipeTransform {
  
    transform(value: any, args?: any): any {
      return "red";
    }
  
  }