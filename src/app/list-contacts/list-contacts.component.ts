import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ContactModel } from '../models/contact.model';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {
  search: string;

  contacts: ContactModel[] = [];
  isLoading: boolean = true;

  constructor(private titleService: Title, private service: ContactsService) { }

  ngOnInit() {
    this.titleService.setTitle('Contatos');

    this.service.getData().subscribe(results => {
      this.contacts = results;

      this.isLoading = false;
    });
  }

  delContact(event: any, index: number) {
    event.stopPropagation();

    this.service.delete(index + 1).subscribe(() => {

      this.contacts.splice(index, 1);
    });
  }

}
