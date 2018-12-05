import { TestBed } from '@angular/core/testing';

import { CuisinedataService } from './cuisinedata.service';

describe('CuisinedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuisinedataService = TestBed.get(CuisinedataService);
    expect(service).toBeTruthy();
  });
});
