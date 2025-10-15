import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskPatient } from './frontdesk-patient';

describe('FrontdeskPatient', () => {
  let component: FrontdeskPatient;
  let fixture: ComponentFixture<FrontdeskPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontdeskPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontdeskPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
