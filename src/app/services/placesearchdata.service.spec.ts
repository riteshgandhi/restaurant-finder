import { TestBed } from '@angular/core/testing';

import { PlacesearchdataService } from './placesearchdata.service';

describe('PlacesearchdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlacesearchdataService = TestBed.get(PlacesearchdataService);
    expect(service).toBeTruthy();
  });
});
