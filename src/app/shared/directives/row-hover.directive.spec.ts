import { RowHoverDirective } from './row-hover.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/*Host component */
@Component({
  template: `<span  appRowHover> Helloworld </span>`
})
class TestHostRowHoverComponent {
}
/*Test Suite */
describe('Directive::RowHoverDirective', () => {
  let component: TestHostRowHoverComponent;
  let fixture: ComponentFixture<TestHostRowHoverComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostRowHoverComponent, 
        RowHoverDirective]
    });
    fixture = TestBed.createComponent(TestHostRowHoverComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('span'));
  });
  
  afterEach(()=>{
    fixture.destroy();
  });

  it('should create an instance', () => {
    const directive = new RowHoverDirective();
    expect(directive).toBeTruthy();
  });

  it('hovering over input', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('gray');
  
    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('white');
  });
});
