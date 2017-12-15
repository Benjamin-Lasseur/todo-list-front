import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../domain/categorie';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategorieService {

  constructor(public http: HttpClient) { }

  categorieSubject: Subject<Categorie[]> = new Subject()

  listerCategories(): Observable<Categorie[]> {
    this.http.get<Categorie[]>(environment.url + "/categories").subscribe(categories => this.categorieSubject.next(categories))
    return this.categorieSubject.asObservable()
  }
}
