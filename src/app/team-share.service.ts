import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamShareService {

  constructor() { }
  private team = new BehaviorSubject<Map<string, any>>(new Map());

  setTeam(incomingTeam: Map<string, any>) {
    this.team.next(incomingTeam);
  }

  getTeam() {
    return this.team.asObservable();
  }
}
