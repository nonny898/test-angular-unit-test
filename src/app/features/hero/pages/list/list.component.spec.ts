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
import { MOCK_HEROES } from 'src/app/core/mock/mock-heroes';
import { Hero } from 'src/app/core/model/hero';
import { DisplayModule } from 'src/app/share/component/display/display.module';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
        DisplayModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        {
          provide: HeroService,
          useValue: heroService,
        },
      ],
      declarations: [ListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
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
    expect(searchLinks.length).toEqual(10);
  });

  it('should handle inputed search', fakeAsync(() => {
    heroService.searchHeroes.and.returnValue(
      of([
        {
          id: 13,
          name: 'Zamit',
          power: 'NITROSTAT',
          alterEgo: 'PPO',
        },
      ])
    );
    component.handleSearch('Zamit');

    tick(500);

    fixture.detectChanges();

    const searchLinks: Array<HTMLAnchorElement> = fixture.debugElement
      .queryAll(By.css('a.hero-search-link'))
      .map((a) => a.nativeElement);
    expect(searchLinks.length).toEqual(1);
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

  it('should delete hero', () => {
    const newHero: Hero = {
      id: 13,
      name: 'Zamit',
      power: 'NITROSTAT',
      alterEgo: 'PPO',
    };
    heroService.deleteHero.and.returnValue(of());
    component.handleDelete(newHero);

    expect(component.heroes.length).toEqual(9);
  });
});
