import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Note } from '../domain/note';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteServiceService {

  private notesTabObs = new Subject<Note[]>()
  private notesTab: Note[] = []

  constructor(public http: HttpClient) { this.updateNotesNonDone()}

  listerNotesNonDone(): Observable<Note[]> {
    return this.notesTabObs.asObservable();
  }

  enregistrer(note: Note) {
    console.log("Entrée dans post NoteService")
    this.http.post<Note>(`${environment.url}/notes`, note, httpOptions).subscribe(data => { this.notesTab.push(data); this.notesTabObs.next(this.notesTab) })
  }

  updateNotesNonDone(): void {
    this.http.get<Note[]>(`${environment.url}/notes`).subscribe(data => { this.notesTab = data; this.notesTabObs.next(this.notesTab) })
  }
}
