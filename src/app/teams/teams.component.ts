import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TeamShareService } from '../team-share.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  data: any = [];
  display:any = [];
  currentPage: number = 1;
  limit: number = 20;
  selectedNumber:number = 0;
  team:any = new Map();
  count=0;
  nameQuery:string = "";
  anyChanges = false;
  queryList = new Map();

  constructor(private router:Router, private httpClient: HttpClient, private teamShare:TeamShareService){}

  ngOnInit(){
    this.httpClient.get("assets/data.json").subscribe(res =>{
      // console.log(res);
      this.data = res;
      this.display = res;      
    })
  }

  AddtoTeam(user:any){
    if (this.team.has(user.domain)){
      alert(`A ${user.domain} member is already present in your Team, Please choose another.`)
    }
    else{
      this.team.set(user.domain,user);
      this.selectedNumber+=1;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.limit);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.limit;
    return this.display.slice(startIndex, startIndex + this.limit);
  }

  SearchByName(){
    this.anyChanges = true;
    let filteredResults:any[] = this.data.filter((user:any)=> user.first_name==this.nameQuery)

    filteredResults = filteredResults.concat(this.data.filter((user:any)=> user.last_name==this.nameQuery));

    filteredResults = filteredResults.concat(this.data.filter((user:any)=> (user.first_name+" "+user.last_name)==this.nameQuery));

    this.display = filteredResults;

  }

  AddGender(query:string,idx:number){
    const btns = document.getElementsByClassName("gender-filter");
    for(let i=0;i<btns.length;i++){
      btns[i].classList.remove("selected-filter");
      if(idx==i){
        btns[i].classList.add("selected-filter");
      }
    }

    this.queryList.set("gender",query);
  }
  AddDomain(query:string,idx:number){
    const btns = document.getElementsByClassName("domain-filter");
    for(let i=0;i<btns.length;i++){
      btns[i].classList.remove("selected-filter");
      if(idx==i){
        btns[i].classList.add("selected-filter");
      }
    }
    
    this.queryList.set("domain",query);
  }
  AddAvailability(query:boolean,idx:number){
    const btns = document.getElementsByClassName("status-filter");
    for(let i=0;i<btns.length;i++){
      btns[i].classList.remove("selected-filter");
      if(idx==i){
        btns[i].classList.add("selected-filter");
      }
    }
    
    this.queryList.set("status",query);

  }

  ApplyFilter(){
    this.anyChanges = true;
    
    if (this.queryList.has("gender")){
      const filteredResults = [];
      for (let i of this.display){
        if (i.gender==this.queryList.get("gender")){
          filteredResults.push(i);
        }
      }
      console.log(filteredResults);
      this.display = filteredResults;
    }
    
    if (this.queryList.has("status")){
      const filteredResults = [];
      for (let i of this.display){
        if (i.available==this.queryList.get("status")){
          filteredResults.push(i);
        }
      }
      console.log(filteredResults);
      this.display = filteredResults;
    }

    if (this.queryList.has("domain")){
      const filteredResults = [];

      for (let i of this.display){
        if (i.domain==this.queryList.get("domain")){
          filteredResults.push(i);
        }
      }
      console.log(filteredResults);

      this.display = filteredResults;
    }

    // return this.totalPages;
  }

  Reset(){
    this.display = this.data;
    this.anyChanges = false;
    this.queryList.clear();

    const btns = document.getElementsByClassName("filter-btn");
    for(let i=0;i<btns.length;i++){
      btns[i].classList.remove("selected-filter");
      
    }
  }

  Finalise(){
    // this.router.navigate(["/display"])
    console.log(this.team)
    this.teamShare.setTeam(this.team);
    // console.log(this.team)
    this.router.navigate(["/display"])

  }

}
