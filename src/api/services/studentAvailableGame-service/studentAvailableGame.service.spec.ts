/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentAvailableGameService } from './studentAvailableGame.service';

describe('Service: StudentAvailableGame', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentAvailableGameService]
    });
  });

  it('should ...', inject([StudentAvailableGameService], (service: StudentAvailableGameService) => {
    expect(service).toBeTruthy();
  }));
});
