import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshModal } from './refresh-modal';

describe('RefreshModal', () => {
  let component: RefreshModal;
  let fixture: ComponentFixture<RefreshModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreshModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
