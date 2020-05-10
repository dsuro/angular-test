import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'single-select-dropdown-list',
  templateUrl: './single-select-dropdown-list.component.html',
  styleUrls: ['./single-select-dropdown-list.component.css']
})
export class SingleSelectDropdownListComponent implements OnInit {
  @Input() data:Array<any>;
  @Input() defaultValue:any;
  @Input() reset:Boolean;
  @Input() disabled:Boolean;
  @Input() showFilter:Boolean;
  @Input() placeHolder:String;
  @Output() onItemSelected:EventEmitter<any>=new EventEmitter<any>();
  public dropdownData:Array<any>=[];
  public placeholderText:String="Select Item";
  public selectedItem:any=null;
  public filter:Boolean=true;
  public isDisabled:Boolean=false;
  public showDropdown:Boolean;

  constructor() { }

  ngOnInit() {
    this.showDropdown=true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue!=changes['data'].currentValue){
      this.dropdownData=this.data;
    }
    if(changes['defaultValue'] && changes['defaultValue'].previousValue!=changes['defaultValue'].currentValue){
      this.setDefatltValue(this.defaultValue);
    }
    if(changes['placeHolder'] && changes['placeHolder'].previousValue!=changes['placeHolder'].currentValue){
      this.placeholderText=this.placeHolder;
    }
    if(changes['reset'] && changes['reset'].previousValue!=changes['reset'].currentValue){
      if(this.reset){
        this.selectedItem=null;
      }
    }
    if(changes['disabled'] && changes['disabled'].previousValue!=changes['disabled'].currentValue){
      this.isDisabled=this.disabled;
    }
    if(changes['showFilter'] && changes['showFilter'].previousValue!=changes['showFilter'].currentValue){
      this.filter=this.showFilter;
    }
  }
  setDefatltValue(value){
    setTimeout(() => {
      this.selectedItem=value;
    }, 100);
  }
  clearData(){
    this.dropdownData=[];
    this.showDropdown=false;
    setTimeout(() => {
      this.showDropdown=true;
      this.dropdownData=this.data;
      this.selectedItem=null; //[]
    }, 100);

  }
  disposeAllObjects(){
    this.dropdownData=null;
    this.placeholderText=null;
    this.selectedItem=null;
    this.filter=null;
    this.isDisabled=null;
    this.showDropdown=null;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.disposeAllObjects();
  }
  onItemChange(event){
    this.onItemSelected.emit(this.selectedItem);
  }
}
