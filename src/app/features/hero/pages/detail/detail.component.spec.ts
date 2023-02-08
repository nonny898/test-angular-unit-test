import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Hero } from 'src/app/core/model/hero';
import { HeroService } from '../../service/hero.service';

import { DetailComponent } from './detail.component';

const DETAIL_HERO: Hero = new Hero({
  id: 12,
  name: 'Matsoft',
  power: 'Xyzal',
  alterEgo: 'ICD-9',
});

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', [
      'getHero',
      'updateHero',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1,
              },
            },
          },
        },
        {
          provide: HeroService,
          useValue: heroService,
        },
      ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [DetailComponent],
    }).compileComponents();

    heroService.getHero.and.returnValue(of(DETAIL_HERO));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get hero', () => {
    component.handleGetHero();
    expect(component.hero).toBeTruthy();
    expect(component.hero).toEqual(DETAIL_HERO);
  });

  it('should not handle save', () => {
    component.hero = null;
    const response = component.handleSave();
    expect(response).toBe('No hero existed');
  });

  it('should handle save', () => {
    heroService.updateHero.and.returnValue(of());
    component.hero = {
      id: 11,
      name: 'Detail: Exist Hero',
      power: '',
      alterEgo: '',
    };

    const response = component.handleSave();
    expect(response).toBe('Updated');
  });
});
