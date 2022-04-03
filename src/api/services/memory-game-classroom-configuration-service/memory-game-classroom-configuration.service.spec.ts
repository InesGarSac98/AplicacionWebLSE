/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoryGameClassroomConfigurationService } from './memory-game-classroom-configuration.service';

describe('Service: MemoryGameClassroomConfiguration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryGameClassroomConfigurationService]
    });
  });

  it('should ...', inject([MemoryGameClassroomConfigurationService], (service: MemoryGameClassroomConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
