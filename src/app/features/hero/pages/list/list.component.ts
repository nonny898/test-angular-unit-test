import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../service/hero.service';
import { Observable, ObservableInput, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/core/model/hero';
import { TableColumnInterface } from 'src/app/share/component/display/table/table.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  heroes: Hero[] = [];
  heroes$!: Observable<Hero[]>;

  searchValue: string = '';

  searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private router: Router) {}

  get columns(): TableColumnInterface[] {
    return [
      {
        headerName: 'ID',
        dataIndex: 'id',
      },
      {
        headerName: 'Name',
        dataIndex: 'name',
      },
      {
        headerName: 'Power',
        dataIndex: 'power',
      },
      {
        headerName: 'Alter Ego',
        dataIndex: 'alterEgo',
      },
    ];
  }

  get dataIndex() {
    return this.columns.map((col) => col.dataIndex);
  }

  ngOnInit(): void {
    this.handleGetHeroes();
    this.handleInitSearch();
  }

  handleInitSearch() {
    const response$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.handleSetSearchValue(term);
      })
    );
    response$.subscribe((res) => {
      this.heroes = res;
    });
  }

  handleGetHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  handleSearch(term: string): void {
    this.searchTerms.next(term);
  }

  handleSetSearchValue(term: string): ObservableInput<Hero[]> {
    this.searchValue = term;
    return this.heroService.searchHeroes(term);
  }

  handleSelect(hero: Hero) {
    this.router.navigate([`/hero/${hero.id}`]);
  }

  handleDelete(hero: Hero) {
    this.heroes = this.heroes.filter((h) => {
      return h.id !== hero.id;
    });
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
