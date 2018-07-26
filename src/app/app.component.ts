import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  host: {
    '(document:click)':'onClick($event)',
  },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showDropDown = false;

  public onClick(event){
    if(!event.target.classList.contains("dropbtn")){
      this.showDropDown=false;
    }
  }

  public showDropDownFunction(){
    this.showDropDown= !this.showDropDown;
  }
}
