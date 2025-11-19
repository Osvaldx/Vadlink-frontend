import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoading } from './screen-loading';

describe('ScreenLoading', () => {
  let component: ScreenLoading;
  let fixture: ComponentFixture<ScreenLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
