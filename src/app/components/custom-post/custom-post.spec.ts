import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPost } from './custom-post';

describe('CustomPost', () => {
  let component: CustomPost;
  let fixture: ComponentFixture<CustomPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
