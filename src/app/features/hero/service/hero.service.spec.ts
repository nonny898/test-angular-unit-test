import { waitForAsync, TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HEROES } from 'src/app/core/mock/mock-heroes';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
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

    // service.searchHeroes('mag').subscribe((res) => {
    //   expect(res).toEqual(response);
    //   expect(res.length).toEqual(2);
    // });

    service.searchHeroes('').subscribe((res) => {
      expect(res).toEqual([]);
      expect(res.length).toEqual(0);
      done();
    });

    // const req = httpMock.expectOne(`api/heroes/?name=''`);
    // req.flush(response);
  });

  // it('should be search heroes empty if empty string', (done) => {
  //   service.searchHeroes('').subscribe((res) => {
  //     expect(res).toEqual([]);
  //     expect(res.length).toEqual(0);
  //     done();
  //   });

  //   const req = httpMock.expectOne(`api/heroes/?name=''`);
  //   req.flush([]);
  // });
});
