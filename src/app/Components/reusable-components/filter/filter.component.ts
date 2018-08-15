import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'input-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit,OnChanges {
  public faFilter = faFilter;
  public selectedKey = "";
  public selectedId = "";
  public selectedSubkey = "";
  public isSetKey = false;
  public isSetSubkey = false;
  public input;
  public filter;
  public li;
  public tagItem;
  public keyItem;
  public keyItemValue;
  public subKeyInputItem;
  public subkeyItem;
  public subkeyItemValue;
  public closeBtn;
  public closeBtnIcon;
  @ViewChild('suggestion_box')ul:ElementRef;
  @ViewChild('tag_list')tagList:ElementRef;
  @ViewChild('main_input')mainInput:ElementRef;
  @Output('output')outputObject = new EventEmitter<any>();
  @Input('input')autosuggestData;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges(changes:{[propKey: string]:SimpleChange}){
    if(changes.autosuggestData && changes.autosuggestData.currentValue!=undefined){
      this.updateData(changes.autosuggestData.currentValue);
    }
  }

  updateData(res){
    this.autosuggestData=res.suggestions;
  }

  showSuggestions(event){
    this.ul.nativeElement.innerHTML='';
    this.input = event.target;
    this.filter = event.target.value.toLowerCase();
    let rect = this.input.getBoundingClientRect();
    this.renderer.setStyle(this.ul.nativeElement,'left',rect.left);
    //checking whether to show suggestion list
    if (this.filter.length == 0) {
    this.renderer.setStyle(this.ul.nativeElement,'display','none');
    } else {
    this.renderer.setStyle(this.ul.nativeElement,'display','block');     
    }
    //if search query is empty 
    if (this.isSetKey == false && this.isSetSubkey == false) {
      for (let i = 0; i < this.autosuggestData.length; i++) {
        //creating a list of keys for which autosuggest is true
        if (this.autosuggestData[i].autosuggest == "true"){
          let item = this.renderer.createElement('li');
          let itemValue = this.renderer.createText(this.autosuggestData[i].name);
          this.renderer.appendChild(item,itemValue);
          this.renderer.setAttribute(item,'id', this.autosuggestData[i].id);
          this.renderer.listen(item, 'click', () => {
            this.selectedKey = item.innerText;
            this.selectedId = item.id;
            this.isSetKey=true;
            this.makeTag();
          });
          this.renderer.appendChild(this.ul.nativeElement,item);
        }
      }
    }
    // if tag is incomplete
    else if(this.isSetKey == true && this.isSetSubkey == false){
      for (let i = 0; i < this.autosuggestData.length; i++) {
        if (this.selectedKey == this.autosuggestData[i].name) {
          for (let j = 0; j < this.autosuggestData[i].values.length;j++) {
            let item = this.renderer.createElement('li');
            let itemValue = this.renderer.createText(this.autosuggestData[i].values[j]);
            this.renderer.appendChild(item,itemValue);
            this.renderer.listen(item, 'click', () => {
            this.selectedSubkey = item.innerText;
            this.isSetSubkey=true;
            this.makeTag();
          });
          this.renderer.appendChild(this.ul.nativeElement,item);
          }
        }
      }
    }
    // Loop through all list items, and hide those who don't match the search query
    this.li = this.ul.nativeElement.getElementsByTagName("li");
    for (let i = 0; i < this.li.length; i++) {
      if (this.li[i].innerHTML.toLowerCase().indexOf(this.filter) > -1) {
        this.li[i].style.display = "";
      } else {
        this.li[i].style.display = "none";
       }
    }
  }

  makeTag(){
    //making suggestion list empty
    this.ul.nativeElement.innerHTML='';
    //making input empty
    this.input.value='';
    //disabling main input
    this.mainInput.nativeElement.setAttribute('disabled', 'disabled');   
    if(this.isSetKey==true&&this.isSetSubkey==false){
      //creating tag li 
      this.tagItem = this.renderer.createElement('li');
      this.renderer.addClass(this.tagItem,'tag');
      //adding the selected key to li
      this.keyItem = this.renderer.createElement('span');
      this.renderer.addClass(this.keyItem,'key');
      this.keyItemValue = this.renderer.createText(this.selectedKey+':');
      this.renderer.appendChild(this.keyItem,this.keyItemValue);
      //adding input for subkey
      this.subKeyInputItem = this.renderer.createElement('input');
      this.renderer.listen(this.subKeyInputItem, 'input', () => {
        this.showSuggestions(event);
      });
      //appending selected key, input to the tag li
      this.renderer.appendChild(this.tagItem,this.keyItem);
      this.renderer.appendChild(this.tagItem,this.subKeyInputItem);
      //adding tag li to ul      
      this.renderer.appendChild(this.tagList.nativeElement,this.tagItem);
    }
    else if(this.isSetKey==true&&this.isSetSubkey==true){
      //removing input box
      this.renderer.removeChild(this.tagItem,this.subKeyInputItem);
      //adding subkey
      this.subkeyItem = this.renderer.createElement('span');
      this.renderer.addClass(this.subkeyItem,'key');
      this.subkeyItemValue = this.renderer.createText(this.selectedSubkey);
      this.renderer.appendChild(this.subkeyItem,this.subkeyItemValue);
      //adding close button
      this.closeBtn =this.renderer.createElement('span');
      this.renderer.addClass(this.closeBtn,'close-btn');
      this.subKeyInputItem = this.renderer.createElement('input');
      this.renderer.listen(this.closeBtn, 'click', () => {
        this.removeTag(event);
      });
      this.closeBtnIcon = this.renderer.createText('x');
      this.renderer.appendChild(this.closeBtn,this.closeBtnIcon);
      //appending selected subkey and close button to the created tag
      this.renderer.appendChild(this.tagItem,this.subkeyItem);
      this.renderer.appendChild(this.tagItem,this.closeBtn);
      //adding tag li to ul      
      this.renderer.appendChild(this.tagList.nativeElement,this.tagItem);
      this.mainInput.nativeElement.removeAttribute('disabled');   
      this.isSetKey=false;
      this.isSetSubkey=false;
    }
  }
  removeTag(event){
    event.target.parentNode.style.display = "none";
  }
}
