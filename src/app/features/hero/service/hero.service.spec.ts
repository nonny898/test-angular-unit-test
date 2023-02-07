import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HEROES } from 'src/app/core/mock/mock-heroes';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MessagesService } from 'src/app/share/component/display/messages/messages.service';
import { Hero } from 'src/app/core/interface/hero.list';

describe('HeroService', () => {
  let service: HeroService;
  let messageService: jasmine.SpyObj<MessagesService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const messageSpy = jasmine.createSpyObj('MessagesService', [
      'add',
      'clear',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessagesService,
          useValue: messageSpy,
        },
      ],
    });
    service = TestBed.inject(HeroService);

    // Inject real service to test bed
    messageService = TestBed.inject(
      MessagesService
    ) as jasmine.SpyObj<MessagesService>;

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(messageService).toBeTruthy();
  });

  it('should be get heroes', (done) => {
    service.getHeroes().subscribe((res) => {
      expect(res).toEqual(HEROES);
      expect(res.length).toEqual(9);
      done();
    });

    const req = httpMock.expectOne(`api/heroes`);
    req.flush(HEROES);
  });

  it('should be search heroes', (done) => {
    const response = [
      { id: 15, name: 'Magneta' },
      { id: 19, name: 'Magma' },
    ];

    service.searchHeroes('mag').subscribe((res) => {
      expect(res).toEqual(response);
      expect(res.length).toEqual(2);
      done();
    });

    const req = httpMock.expectOne(`api/heroes/?name=mag`);
    req.flush(response);
  });

  it('should be search non-exist heroes empty', (done) => {
    service.searchHeroes('test').subscribe((res) => {
      expect(res.length).toEqual(0);
      done();
    });

    const req = httpMock.expectOne(`api/heroes/?name=test`);
    req.flush([]);
  });

  it('should be search heroes empty if empty string', (done) => {
    service.searchHeroes('').subscribe((res) => {
      expect(res).toEqual([]);
      expect(res.length).toEqual(0);
      done();
    });
  });

  it('should be get hero return fetch log', (done) => {
    const hero: Hero = { id: 12, name: 'Dr. Nice' };

    const stubValue: string = `HeroService: fetched hero id=${12}`;

    messageService.add.and.returnValue(stubValue);

    service.getHero(12).subscribe((res) => {
      expect(res).toEqual(hero);

      // Check spy object call count
      expect(messageService.add.calls.count()).toBe(1);

      // Check spy most recent return value
      expect(messageService.add.calls.mostRecent().returnValue).toBe(stubValue);
      done();
    });

    const req = httpMock.expectOne(`api/heroes/12`);
    req.flush(hero);
  });

  it('should be create hero return added log', (done) => {
    const hero = { name: 'Create New Hero' };

    const stubValue: string = `HeroService: added hero w/ id=${21}`;

    messageService.add.and.returnValue(stubValue);

    service.createHero(hero as Hero).subscribe((res) => {
      expect(res).toEqual({ id: 21, ...hero });

      // Check spy object call count
      expect(messageService.add.calls.count()).toBe(1);

      // Check spy most recent return value
      expect(messageService.add.calls.mostRecent().returnValue).toBe(stubValue);
      done();
    });

    const req = httpMock.expectOne(`api/heroes`);
    req.flush({ id: 21, ...hero });
  });

  it('should be delete hero return deleted log', (done) => {
    const stubValue: string = `HeroService: deleted hero id=${21}`;

    messageService.add.and.returnValue(stubValue);

    service.deleteHero(21).subscribe((res) => {
      // Check spy object call count
      expect(messageService.add.calls.count()).toBe(1);

      // Check spy most recent return value
      expect(messageService.add.calls.mostRecent().returnValue).toBe(stubValue);
      done();
    });

    const req = httpMock.expectOne(`api/heroes/21`);
    req.flush(null);
  });
});
