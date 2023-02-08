import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessagesService } from './messages.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messagesService: jasmine.SpyObj<MessagesService>;

  beforeEach(async () => {
    messagesService = jasmine.createSpyObj('MessagesService', [
      'messages',
      'add',
    ]);
    await TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [
        {
          provide: MessagesService,
          useValue: messagesService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get recent message', fakeAsync(() => {
    expect(component.recentMessage).toEqual('');

    messagesService.messages = ['Call message service'];
    fixture.detectChanges();
    tick();
    expect(component.recentMessage).toEqual('Call message service');
  }));
});
