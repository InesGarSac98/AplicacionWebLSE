/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassroomsService } from './classrooms.service';

describe('Service: Students', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomsService]
    });
  });

  it('should ...', inject([ClassroomsService], (service: ClassroomsService) => {
    expect(service).toBeTruthy();
  }));
});
