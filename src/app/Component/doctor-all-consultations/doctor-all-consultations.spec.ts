import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAllConsultations } from './doctor-all-consultations';

describe('DoctorAllConsultations', () => {
  let component: DoctorAllConsultations;
  let fixture: ComponentFixture<DoctorAllConsultations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAllConsultations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAllConsultations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
