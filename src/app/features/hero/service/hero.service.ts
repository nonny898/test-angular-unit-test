import { Injectable } from '@angular/core';
import { Hero } from 'src/app/core/interface/hero.list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessagesService } from 'src/app/share/component/display/messages/messages.service';
import Path from 'src/app/core/api/path';
import { InMemoryDataService } from 'src/app/core/api/in-memory-data.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private inMemoryDataService: InMemoryDataService,
    private messageService: MessagesService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(Path.heroes).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.inMemoryDataService.handleError<Hero[]>('getHeroes', []))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${Path.heroes}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(
        this.inMemoryDataService.handleError<Hero[]>('searchHeroes', [])
      )
    );
  }

  getHero(id: number): Observable<Hero | null> {
    const url = `${Path.heroes}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.inMemoryDataService.handleError<Hero>(`getHero id=${id}`))
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(Path.heroes, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.inMemoryDataService.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<void> {
    return this.http.put(Path.heroes, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.inMemoryDataService.handleError<any>('updateHero'))
    );
  }

  deleteHero(id: number): Observable<void> {
    const url = `${Path.heroes}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.inMemoryDataService.handleError<any>('deleteHero'))
    );
  }
}
