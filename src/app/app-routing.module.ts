import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contatos'
  }, {
    path: 'contatos',
    component: ListContactsComponent
  }, {
    path: 'contatos/:id', // For new records too
    component: ContactComponent
  }, {
    path: 'erro-404',
    component: PageNotFoundComponent
  }, {
    path: '**',
    redirectTo: 'erro-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
