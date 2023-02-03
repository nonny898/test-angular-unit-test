import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    const message = 'Test message.';
    service.add(message);
    expect(service.messages.length).toBeLessThan(2);
  });

  it('should clear message', () => {
    service.clear();
    expect(service.messages.length).toBeLessThan(1);
  });
});
