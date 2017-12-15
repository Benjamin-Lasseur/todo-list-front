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

  done(note): void {
    this.noteService.noteDone(note);
  }

  applyCategorieStyle(id: number): string {
    let style: string = "list-group-item"
    if (this.styleCategorie.find(obj => obj.categorieId == id) != null) {
      style = this.styleCategorie.find(obj => obj.categorieId == id).style
    }
    return style
  }

  styleCategorie: any[] = [{
    categorieId: 1,
    style: "list-group-item list-group-item-info"
  },
  {
    categorieId: 2,
    style: "list-group-item list-group-item-danger"
  }]

  ngOnInit() {
    this.notesObs = this.noteService.listerNotesNonDone()
    this.notesObs.subscribe(notes => this.notesNonDonetab = notes.sort(this.compare))
  }

  joursRestants(dateFin: Date): string {
    let nbJours: number = Math.round((dateFin.getTime() - new Date().getTime()) / (60 * 60 * 24 * 1000))
    if (nbJours < 0) {
      return "En retard de " + (nbJours * -1) + " jours!"
    }
    if (nbJours == 0) {
      return "A faire aujourd'hui!"
    }
    if (nbJours < 30) {
      return nbJours + " jours restant!"
    }
    if (nbJours > 30) {
      return Math.round(nbJours / 30) + " mois restant!"
    }
    return null
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
