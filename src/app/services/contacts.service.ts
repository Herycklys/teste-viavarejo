import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { ContactModel } from '../models/contact.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseApiUri: string = 'https://private-f91e8-optimusbrasil.apiary-mock.com';
  private keyLocalstorage: string = 'contactsLocalCache';

  constructor(private http: HttpClient) { }

  getDataFromLocal(): ContactModel[] {
    const data = localStorage.getItem(this.keyLocalstorage);

    return data ? JSON.parse(data) : null;
  }

  setDataInLocal(data: ContactModel[]) {
    localStorage.setItem(this.keyLocalstorage, JSON.stringify(data));
  };

  getDataFromApi(): Observable<ContactModel[]> {
    const observable$ = this.http.get<ContactModel[]>(`${this.baseApiUri}/users`).pipe(
      map(records => records.map((record, index) => {
        record.id = ++index;

        return record;
      }))
    );

    observable$.subscribe(records => this.setDataInLocal(records));

    return observable$;
  }

  getData(): Observable<ContactModel[]> {
    const dataFromLocal = this.getDataFromLocal();

    return dataFromLocal ? of(dataFromLocal) : this.getDataFromApi();
  }

  getById(id: number): Observable<ContactModel> {
    return this.getData().pipe(
      map(records => records[id - 1])
    );
  }

  find(prop, value): Observable<ContactModel> {
    return this.getData().pipe(
      map(records => records.find(contact => contact[prop] === value))
    );
  }

  save(contact: ContactModel): Observable<ContactModel> {
    const listData$ = this.getData();

    let observable$;

    if (contact.id) {

      observable$ = listData$.pipe(
        switchMap(records => {
          records[contact.id - 1] = contact;

          this.setDataInLocal(records);

          return of(contact);
        })
      );
    } else {

      observable$ = listData$.pipe(
        switchMap(records => {
          contact.id = records.length + 1;

          records.push(contact);

          this.setDataInLocal(records);

          return of(contact);
        })
      );
    }

    return observable$;
  }

  delete(id: number): Observable<null> {

    return this.getData().pipe(
      switchMap(records => {
        records.splice(id - 1, 1);

        this.setDataInLocal(records);

        return of(null);
      })
    );
  }
}
