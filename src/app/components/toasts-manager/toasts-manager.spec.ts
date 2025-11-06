import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsManager } from './toasts-manager';

describe('ToastsManager', () => {
  let component: ToastsManager;
  let fixture: ComponentFixture<ToastsManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastsManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastsManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
