import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  Select(num:number){
  let btn = document.querySelectorAll(".btn");

  for (let i=0;i<btn.length;i++){
      if(i==num){
          btn[num].classList.remove("unselected");
          btn[num].classList.add("selected");
      }
      else{
          btn[i].classList.remove("selected");
          btn[i].classList.add("unselected");
      }
  }

}
}
