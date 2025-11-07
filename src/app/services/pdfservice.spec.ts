import { TestBed } from '@angular/core/testing';

import { Pdfservice } from './pdfservice';

describe('Pdfservice', () => {
  let service: Pdfservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pdfservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
