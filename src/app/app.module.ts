import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { ContactComponent } from './contact/contact.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormatterPipe } from './pipes/formatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListContactsComponent,
    ContactComponent,
    FilterPipe,
    PageNotFoundComponent,
    FormatterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
