import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfile } from './info-profile';

describe('InfoProfile', () => {
  let component: InfoProfile;
  let fixture: ComponentFixture<InfoProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
