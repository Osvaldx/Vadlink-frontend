import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsTemplate } from './charts-template';

describe('ChartsTemplate', () => {
  let component: ChartsTemplate;
  let fixture: ComponentFixture<ChartsTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
