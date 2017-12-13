import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import DateUtil from './shared/util/date-util'





import { AppComponent } from './app.component';
import { FormNoteComponent } from './form-note/form-note.component';
import { NoteServiceService } from './shared/service/note-service.service';
import { ListNotesComponent } from './list-notes/list-notes.component';


@NgModule({
  declarations: [
    AppComponent,
    FormNoteComponent,
    ListNotesComponent

  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NoteServiceService, DateUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
