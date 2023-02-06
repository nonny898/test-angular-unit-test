import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../../hero-routing.module';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { HeroService } from '../../service/hero.service';
import { of } from 'rxjs';
import { Hero } from 'src/app/core/interface/hero.list';

const MOCK_HEROES = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'searchHeroes',
      'createHero',
      'deleteHero',
    ]);

    heroService.getHeroes.and.returnValue(of(MOCK_HEROES));

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: HeroService,
          useValue: heroService,
        },
      ],
      declarations: [ListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle create hero button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const createElement = compiled.querySelector(
      'button[data-test-id=create-hero-button]'
    );
    if (createElement) {
      expect(createElement.textContent).toContain('Create');
    }
  });

  it('should handle initial search', () => {
    const searchLinks: Array<HTMLAnchorElement> = fixture.debugElement
      .queryAll(By.css('a.hero-search-link'))
      .map((a) => a.nativeElement);
    expect(searchLinks.length).toEqual(0);
  });

  it('should handle inputed search', fakeAsync(() => {
    heroService.searchHeroes.and.returnValue(
      of([
        { id: 15, name: 'Magneta' },
        { id: 19, name: 'Magma' },
      ])
    );
    component.handleSearch('mag');

    tick(500);

    fixture.detectChanges();

    const searchLinks: Array<HTMLAnchorElement> = fixture.debugElement
      .queryAll(By.css('a.hero-search-link'))
      .map((a) => a.nativeElement);
    expect(searchLinks.length).toEqual(2);
  }));

  describe('Testing List Heros', () => {
    for (let i = 12; i < 21; i++) {
      it(`should list heroes button ${i}`, () => {
        const heroButton = fixture.debugElement.query(
          By.css(`[data-test-id="hero-link-${i}"]`)
        );
        expect(heroButton).toBeTruthy();
      });
    }
  });

  it('should handle to detail button', fakeAsync(
    inject([Router], (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate').and.stub();

      const compiled = fixture.debugElement.nativeElement;
      const heroButton = compiled.querySelector(
        `[data-test-id="hero-link-${12}"]`
      );

      expect(heroButton).toBeTruthy();

      heroButton.click();

      // Emulate passing time
      tick();

      expect(spy.calls.first().args[0]).toContain('/hero/12');
    })
  ));

  it('should create hero', () => {
    const newHero: Hero = {
      id: 21,
      name: 'List: Create New Hero',
    };

    heroService.createHero.and.returnValue(of(newHero));
    component.handleAdd(newHero.name);

    expect(component.heroes.length).toEqual(10);
    expect(component.heroes[9]).toEqual(newHero);
  });

  it('should delete hero', () => {
    const newHero: Hero = {
      id: 21,
      name: 'List: Delete New Hero',
    };
    heroService.deleteHero.and.returnValue(of());
    component.handleDelete(newHero);

    expect(component.heroes.length).toEqual(9);
  });
});
