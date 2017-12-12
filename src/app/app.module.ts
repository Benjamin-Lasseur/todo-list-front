import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule }   from '@angular/forms'



import { AppComponent } from './app.component';
import { FormNoteComponent } from './form-note/form-note.component';


@NgModule({
  declarations: [
    AppComponent,
    FormNoteComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
