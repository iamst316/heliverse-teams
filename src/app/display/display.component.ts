import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamShareService } from '../team-share.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit{
  team:any[] = [];
  constructor(private teamShare: TeamShareService){}

  ngOnInit() {
    this.teamShare.getTeam().subscribe((team: any) => {
      for (let [key,value] of team){
        this.team.push(value);
      }
    });
  }
}
