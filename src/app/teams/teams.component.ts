import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private httpClient: HttpClient){}
  ngOnInit(){
    this.httpClient.get("assets/data.json").subscribe(res =>{
      console.log(res);
      this.data = res;
      // this.display = this.data;
    })
  }

  AddtoTeam(id:number){
    this.selectedNumber+=1;
  }
  get totalPages(): number {
    return Math.ceil(this.data.length / this.limit);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.limit;
    return this.data.slice(startIndex, startIndex + this.limit);
  }
}
