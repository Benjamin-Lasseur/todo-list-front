import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/domain/note';
import { Observable } from 'rxjs/Observable';
import { NoteServiceService } from '../shared/service/note-service.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  notesNonDonetab: Note[] = []

  notesObs: Observable<Note[]>;


  constructor(public noteService: NoteServiceService) { }

  ngOnInit() {
    this.notesObs = this.noteService.listerNotesNonDone()
    this.notesObs.subscribe(notes => this.notesNonDonetab = notes.sort(this.compare))
  }

  joursRestants(dateFin: Date): number {
    return Math.round((dateFin.getTime() - new Date().getTime()) / (60 * 60 * 24 * 1000))
  }

  compare(a: Note, b: Note): number {
    if (a.dateFin > b.dateFin) {
      return 1
    }
    if (a.dateFin < b.dateFin) {
      return -1
    }
    return 0
  }

}
