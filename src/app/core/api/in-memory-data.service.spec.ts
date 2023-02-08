import { TestBed } from '@angular/core/testing';
import { HeroFormInterface } from '../interface/hero.form';
import { MOCK_HEROES } from '../mock/mock-heroes';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should createDB return HEROES', () => {
    expect(service.createDb()).toEqual({ heroes: MOCK_HEROES });
  });

  it('should getId return max integer', () => {
    const newId = service.genId([
      { id: 20, name: 'Tornado', power: 'Xyzal', alterEgo: 'ICD-9' },
    ]);
    expect(newId).toEqual(21);
  });

  it('should getId return 11 for empty array', () => {
    const newId = service.genId([]);
    expect(newId).toEqual(11);
  });

  it('should handle error when create', (done) => {
    service
      .handleError<HeroFormInterface>('addHero', {
        id: null,
        name: 'Tornado',
        power: 'Xyzal',
        alterEgo: 'ICD-9',
      })('Cannot create hero')
      .subscribe((res) => {
        expect(res.id).toEqual(null);
        done();
      });
  });
  it('should handle error when create', (done) => {
    service
      .handleError<undefined>()('Empty handle error')
      .subscribe((res) => {
        expect(res).toEqual(undefined);
        done();
      });
  });
});
