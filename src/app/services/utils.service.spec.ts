import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test ValidateCPF()', () => {
    it('CPF should be invalid', () => {
      expect(UtilsService.ValidateCPF('12345678912')).toBeFalsy();
    });

    it('CPF should be valid', () => {
      expect(UtilsService.ValidateCPF('55555555555')).toBeTruthy();
    });
  });

});
