import { TestBed } from '@angular/core/testing';

import { MessageManager } from './message-manager';

describe('MessageManager', () => {
  let service: MessageManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
