import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUploadImage } from './input-upload-image';

describe('InputUploadImage', () => {
  let component: InputUploadImage;
  let fixture: ComponentFixture<InputUploadImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputUploadImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputUploadImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
