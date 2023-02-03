import { waitForAsync, TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HEROES } from 'src/app/core/mock/mock-heroes';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get heroes', waitForAsync(
    inject([HeroService], (heroService: HeroService) => {
      heroService.getHeroes().subscribe((res) => expect(res).toEqual(HEROES));
    })
  ));
});
