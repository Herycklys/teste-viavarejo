import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { ContactsService } from '../services/contacts.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  let routeSpy, titleSpy, activatedRouteSpy, contactsServiceSpy;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {

    activatedRouteSpy = {
      paramMap: of({
        get() { return '1'; }
      })
    };

    routeSpy = {
      routeReuseStrategy: {}
    };

    titleSpy = {};

    contactsServiceSpy = {};

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ContactComponent],
      providers: [
        {
          provide: Router,
          useValue: routeSpy
        }, {
          provide: Title,
          useValue: titleSpy
        }, {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        }, {
          provide: FormBuilder,
          useValue: formBuilder
        }, {
          provide: ContactsService,
          useValue: contactsServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('routeReuseStrategy.shouldReuseRoute should be false', () => {
  });
});
