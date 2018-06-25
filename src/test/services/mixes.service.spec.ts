import { TestBed, inject } from '@angular/core/testing';

import { MixesService } from './mixes.service';

describe('MixesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MixesService]
    });
  });

  it('should be created', inject([MixesService], (service: MixesService) => {
    expect(service).toBeTruthy();
  }));
});
