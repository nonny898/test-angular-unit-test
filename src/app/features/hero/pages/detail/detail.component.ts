import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/core/model/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  hero: Hero | null = null;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.handleGetHero();
  }

  handleGetHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero): void => {
      this.hero = hero;
    });
  }

  handleSave(): string {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.handleBack());
      return 'Updated';
    }
    return 'No hero existed';
  }

  handleBack(): void {
    this.location.back();
  }
}
