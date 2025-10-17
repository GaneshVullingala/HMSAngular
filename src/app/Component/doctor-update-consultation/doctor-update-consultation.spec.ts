import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateConsultation } from './doctor-update-consultation';

describe('DoctorUpdateConsultation', () => {
  let component: DoctorUpdateConsultation;
  let fixture: ComponentFixture<DoctorUpdateConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorUpdateConsultation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorUpdateConsultation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
