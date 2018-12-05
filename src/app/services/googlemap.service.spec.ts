import { TestBed } from '@angular/core/testing';

import { GooglemapService } from './googlemap.service';

describe('GooglemapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GooglemapService = TestBed.get(GooglemapService);
    expect(service).toBeTruthy();
  });
});
