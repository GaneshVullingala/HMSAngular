import { TestBed } from '@angular/core/testing';

import { DoctorCosnultationService } from './doctor-cosnultation-service';

describe('DoctorCosnultationService', () => {
  let service: DoctorCosnultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorCosnultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
