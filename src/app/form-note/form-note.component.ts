import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {

  public noteForm: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: '',
      type : 'date'/* ,
      description: '',
      dateFin: '',
      duree: '' */
    })
  }

  get title() { return this.noteForm.get('title') }
  get type() { return this.noteForm.get('type') }
  /* get description() { return this.noteForm.get('description') }
  get dateFin() { return this.noteForm.get('dateFin') }
  get duree() { return this.noteForm.get('duree') } */
}
