import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { ContactsService } from '../services/contacts.service';

export class ValidExists {
  private currentId: number;

  constructor(private contactsService: ContactsService) { }

  setId(id: number) {
    this.currentId = id;
  }

  validate(property: string) {

    return (control: AbstractControl) => {

      return this.contactsService.find(property, control.value).pipe(
        map(contactFound => {
          if (contactFound && this.currentId === contactFound.id) return null;

          return contactFound ? { validexists: true } : null
        })
      );
    }
  }

}
