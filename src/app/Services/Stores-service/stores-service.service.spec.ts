import { TestBed, inject } from '@angular/core/testing';

import { StoresServiceService } from './stores-service.service';

describe('StoresServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoresServiceService]
    });
  });

  it('should be created', inject([StoresServiceService], (service: StoresServiceService) => {
    expect(service).toBeTruthy();
  }));
});
