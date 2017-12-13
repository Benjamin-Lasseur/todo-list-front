import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';





import { AppComponent } from './app.component';
import { FormNoteComponent } from './form-note/form-note.component';
import { NoteServiceService } from './shared/service/note-service.service';


@NgModule({
  declarations: [
    AppComponent,
    FormNoteComponent

  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NoteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
