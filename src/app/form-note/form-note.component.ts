import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Note } from '../shared/domain/note';
import { NoteServiceService } from '../shared/service/note-service.service';




@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {

  actionsDuree: any = [
    {
      key: "jours",
      action: () => {
        let dateTemp: Date = new Date();
        dateTemp.setDate(dateTemp.getDate() + parseInt(this.nbDuree.value));
        return dateTemp
      }
    },
    {
      key: "semaines",
      action: () => {
        let dateTemp: Date = new Date();
        dateTemp.setDate(dateTemp.getDate() + parseInt(this.nbDuree.value) * 7);
        return dateTemp
      }
    },
    {
      key: "mois",
      action: () => {
        let dateTemp: Date = new Date();
        dateTemp.setMonth(dateTemp.getMonth() + parseInt(this.nbDuree.value));
        return dateTemp
      }
    },
    {
      key: "années",
      action: () => {
        let dateTemp: Date = new Date();
        dateTemp.setFullYear(dateTemp.getFullYear() + parseInt(this.nbDuree.value));
        return dateTemp
      }
    }
  ]

  public noteForm: FormGroup

  constructor(private fb: FormBuilder, private noteService: NoteServiceService) { }

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: '',
      type: 'date',
      description: '',
      dateFin: new Date(),
      duree: {
        value: this.actionsDuree[0].action, disabled: true
      },
      nbDuree: { value: '', disabled: true }
    })
  }

  byKey(a: any, b: any): boolean {
    if (a == null || b == null) {
      return false
    } if (a.key == b.key) {
      return true
    }
    return false
  }

  disableOptions(value: string): void {
    if (value == "date") {
      this.nbDuree.disable();
      this.duree.disable();
      this.dateFin.enable();
    }
    if (value == "duree") {
      this.nbDuree.enable();
      this.duree.enable();
      this.dateFin.disable();
    }
  }

  enregistrer(): void {
    let newNote: Note
    if (this.type.value == "date") {
      newNote = new Note(0, this.title.value, this.description.value, null, this.dateFin.value, false)
      this.noteService.enregistrer(newNote);
    } else if (this.type.value == "duree") {
      newNote = new Note(0, this.title.value, this.description.value, null, this.duree.value(), false)
      this.noteService.enregistrer(newNote);
    }
  }

  get title() { return this.noteForm.get('title') }
  get type() { return this.noteForm.get('type') }
  get description() { return this.noteForm.get('description') }
  get dateFin() { return this.noteForm.get('dateFin') }
  get duree() { return this.noteForm.get('duree') }
  get nbDuree() { return this.noteForm.get('nbDuree') }
}
