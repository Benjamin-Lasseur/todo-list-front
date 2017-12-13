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

  public noteForm: FormGroup

  public dureeTab: string[] = ['jours', 'semaines', 'mois', 'années']
  constructor(private fb: FormBuilder, private noteService: NoteServiceService) { }

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: '',
      type: 'date',
      description: '',
      dateFin: new Date(),
      duree: { value: '', disabled: true },
      nbDuree: { value: '', disabled: true }
    })
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
    let newNote: Note = new Note(0, this.title.value, this.description.value, null, this.dateFin.value, false)
    console.log(newNote.description)
    this.noteService.enregistrer(newNote);
  }

  get title() { return this.noteForm.get('title') }
  get type() { return this.noteForm.get('type') }
  get description() { return this.noteForm.get('description') }
  get dateFin() { return this.noteForm.get('dateFin') }
  get duree() { return this.noteForm.get('duree') }
  get nbDuree() { return this.noteForm.get('nbDuree') }
}
