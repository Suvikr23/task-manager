import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TaskBoardComponent } from './task-board/task-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MultiselectDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
