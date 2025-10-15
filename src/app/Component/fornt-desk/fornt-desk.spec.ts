import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForntDesk } from './fornt-desk';

describe('ForntDesk', () => {
  let component: ForntDesk;
  let fixture: ComponentFixture<ForntDesk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForntDesk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForntDesk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
