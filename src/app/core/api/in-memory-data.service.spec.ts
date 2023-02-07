import { TestBed } from '@angular/core/testing';
import { Hero } from '../interface/hero.list';

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
    expect(service.createDb()).toEqual({
      heroes: [
        { id: 12, name: 'Dr. Nice' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr. IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' },
      ],
    });
  });

  it('should getId return max integer', () => {
    const newId = service.genId([{ id: 20, name: 'Tornado' }]);
    expect(newId).toEqual(21);
  });

  it('should getId return 11 for empty array', () => {
    const newId = service.genId([]);
    expect(newId).toEqual(11);
  });

  it('should handle error when create', (done) => {
    service
      .handleError<Hero>('addHero', { id: 20, name: 'Tornado' })(
        'Cannot create hero'
      )
      .subscribe((res) => {
        expect(res.id).toEqual(20);
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
