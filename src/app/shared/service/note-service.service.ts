import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Note } from '../domain/note';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import DateUtil from '../util/date-util'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteServiceService {

  constructor(public http: HttpClient, public dateUtil: DateUtil) {
    this.http.get<Note[]>(`${environment.url}/notes`)
      .subscribe(notes => {
        notes.forEach(note => {
          this.notesTab.push(this.dateUtil.convertDateStringToJSON(note, ["dateFin", "dateDebut"]))
        })
        this.notesSubject.next(this.notesTab)
      })
  }

  notesSubject: Subject<Note[]> = new Subject()
  notesTab: Note[] = []

  listerNotesNonDone(): Observable<Note[]> {
    return this.notesSubject.asObservable()
  }

  enregistrer(note: Note): void {
    this.http.post<Note>(`${environment.url}/notes`, note, httpOptions)
      .subscribe(note => {
        this.notesTab.push(this.dateUtil.convertDateStringToJSON(note, ["dateFin", "dateDebut"]));
        this.notesSubject.next(this.notesTab)
      })
  }

  noteDone(note: Note): void {
    this.http.put<Note[]>(`${environment.url}/notes`, note, httpOptions).subscribe(notes => {
      this.notesTab = []
      notes.forEach(note => {
        this.notesTab.push(this.dateUtil.convertDateStringToJSON(note, ["dateFin", "dateDebut"]))
      })
      this.notesSubject.next(this.notesTab)
    })
  }

}
