import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { ContactsService } from './contacts.service';
import { of } from 'rxjs';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const resultMock = [
    {
      "id": 1,
      "name": "My name 1",
      "cpf": "04080757247",
      "phone": "11987654321",
      "email": "myemail1@test.com.br"
    },
    {
      "id": 2,
      "name": "My name 2",
      "cpf": "77797584192",
      "phone": "11987654321",
      "email": "myemail2@test.com.br"
    }
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    httpClientSpy.get.and.returnValue(
      of([
        {
          "name": "My name 1",
          "cpf": "04080757247",
          "phone": "11987654321",
          "email": "myemail1@test.com.br"
        },
        {
          "name": "My name 2",
          "cpf": "77797584192",
          "phone": "11987654321",
          "email": "myemail2@test.com.br"
        }
      ])
    );

    TestBed.configureTestingModule({
      providers: [
        ContactsService,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });

    service = TestBed.get(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test getDataFromLocal()', () => {
    it('localStorage should not have nothing', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      expect(service.getDataFromLocal()).toBeNull();
    });

    it('localStorage should have something', () => {
      spyOn(localStorage, 'getItem').and.returnValue(`[
        {
          "name": "My name 1",
          "cpf": "04080757247",
          "phone": "11987654321",
          "email": "myemail1@test.com.br"
        },
        {
          "name": "My name 2",
          "cpf": "77797584192",
          "phone": "11987654321",
          "email": "myemail2@test.com.br"
        },
        {
          "name": "My name 3",
          "cpf": "45486737688",
          "phone": "11987654321",
          "email": "myemail3@test.com.br"
        }
      ]`);

      expect(service.getDataFromLocal()).toEqual([
        {
          "name": "My name 1",
          "cpf": "04080757247",
          "phone": "11987654321",
          "email": "myemail1@test.com.br"
        },
        {
          "name": "My name 2",
          "cpf": "77797584192",
          "phone": "11987654321",
          "email": "myemail2@test.com.br"
        },
        {
          "name": "My name 3",
          "cpf": "45486737688",
          "phone": "11987654321",
          "email": "myemail3@test.com.br"
        }
      ]);
    });
  });

  describe('test setDataInLocal()', () => {
    it('should save as string', () => {
      spyOn(localStorage, 'setItem');

      service.setDataInLocal([
        {
          "name": "My name 1",
          "cpf": "04080757247",
          "phone": "11987654321",
          "email": "myemail1@test.com.br"
        },
        {
          "name": "My name 2",
          "cpf": "77797584192",
          "phone": "11987654321",
          "email": "myemail2@test.com.br"
        },
        {
          "name": "My name 3",
          "cpf": "45486737688",
          "phone": "11987654321",
          "email": "myemail3@test.com.br"
        }
      ]);

      expect(localStorage.setItem).toHaveBeenCalledWith('contactsLocalCache', JSON.stringify([
        {
          "name": "My name 1",
          "cpf": "04080757247",
          "phone": "11987654321",
          "email": "myemail1@test.com.br"
        },
        {
          "name": "My name 2",
          "cpf": "77797584192",
          "phone": "11987654321",
          "email": "myemail2@test.com.br"
        },
        {
          "name": "My name 3",
          "cpf": "45486737688",
          "phone": "11987654321",
          "email": "myemail3@test.com.br"
        }
      ]));
    });
  });

  describe('test getDataFromApi()', () => {
    it('should make a request', (done: DoneFn) => {
      spyOn(service, 'setDataInLocal');

      service
        .getDataFromApi()
        .subscribe(result => {
          expect(result).toEqual(resultMock);

          expect(service.setDataInLocal).toHaveBeenCalledWith(resultMock);

          done();
        });
    });
  });

  describe('test getData()', () => {
    it('return from localStorage', (done: DoneFn) => {

      spyOn(service, 'getDataFromLocal').and.returnValue(resultMock);

      service
        .getData()
        .subscribe(result => {
          expect(result).toEqual(resultMock);
          expect(service.getDataFromLocal).toHaveBeenCalled();

          done();
        });
    });

    it('return from api', (done: DoneFn) => {
      spyOn(service, 'getDataFromLocal').and.returnValue(null);
      spyOn(service, 'getDataFromApi').and.returnValue(of(resultMock));

      service
        .getData()
        .subscribe(result => {
          expect(result).toEqual(resultMock);
          expect(service.getDataFromLocal).toHaveBeenCalled();

          done();
        });
    });
  });

  describe('test find()', () => {
    beforeAll(() => {
      spyOn(service, 'getData').and.returnValue(of(resultMock));
    });

    it('should not found', () => {
      service
        .find('name', 'test')
        .subscribe(result => {
          expect(result).toBeUndefined();
        });
    });

    it('should found', () => {
      service
        .find('cpf', '04080757247')
        .subscribe(result => {
          expect(result).toEqual({
            "id": 1,
            "name": "My name 1",
            "cpf": "04080757247",
            "phone": "11987654321",
            "email": "myemail1@test.com.br"
          });
        });
    });
  });

  describe('test save()', () => {
    it('new record', (done: DoneFn) => {
      const dataToSave = {
        "name": "test",
        "cpf": "77797584192",
        "phone": "11987654321",
        "email": "myemail2@test.com.br"
      };

      const copyResultMock = [].concat(resultMock);

      spyOn(service, 'setDataInLocal');
      spyOn(service, 'getData').and.returnValue(of(copyResultMock));

      service
        .save(dataToSave)
        .subscribe(result => {
          const dataAfterSent = Object.assign({}, dataToSave, { id: 3 });

          expect(result).toEqual(dataAfterSent);
          expect(service.setDataInLocal).toHaveBeenCalledWith(copyResultMock);

          done();
        });
    });

    it('update record', (done: DoneFn) => {
      const dataToSave = {
        "id": 1,
        "name": "test",
        "cpf": "77797584192",
        "phone": "11987654321",
        "email": "myemail2@test.com.br"
      };

      const copyResultMock = [].concat(resultMock);

      spyOn(service, 'setDataInLocal');
      spyOn(service, 'getData').and.returnValue(of(copyResultMock));

      service
        .save(dataToSave)
        .subscribe(result => {

          expect(copyResultMock[0]).toEqual(dataToSave);
          expect(service.setDataInLocal).toHaveBeenCalledWith(copyResultMock);

          done();
        });
    });
  });

  describe('test delete()', () => {
    it('should delete', (done: DoneFn) => {
      const copyResultMock = [].concat(resultMock);

      spyOn(service, 'setDataInLocal');
      spyOn(service, 'getData').and.returnValue(of(copyResultMock));

      service
        .delete(1)
        .subscribe(result => {
          expect(result).toBeNull();

          expect(copyResultMock.length).toEqual(1);

          expect(service.setDataInLocal).toHaveBeenCalledWith(
            [{
              "id": 2,
              "name": "My name 2",
              "cpf": "77797584192",
              "phone": "11987654321",
              "email": "myemail2@test.com.br"
            }]
          );

          done();
        });
    });
  });
});
