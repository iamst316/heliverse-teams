import { TestBed } from '@angular/core/testing';

import { TeamShareService } from './team-share.service';

describe('TeamShareService', () => {
  let service: TeamShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
