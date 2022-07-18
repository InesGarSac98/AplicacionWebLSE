/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GamesService } from './games.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('Service: GamesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpClient, GamesService]
        });
    });

    it('should ...', inject([GamesService], (service: GamesService) => {
        expect(service).toBeTruthy();
    }));
});
