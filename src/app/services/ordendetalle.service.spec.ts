import { TestBed } from '@angular/core/testing';

import { OrdendetalleService } from './ordendetalle.service';

describe('OrdendetalleService', () => {
  let service: OrdendetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdendetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
