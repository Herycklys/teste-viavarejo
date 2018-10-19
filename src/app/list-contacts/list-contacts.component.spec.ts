import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ListContactsComponent } from './list-contacts.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { FormatterPipe } from '../pipes/formatter.pipe';
import { ContactsService } from '../services/contacts.service';
import { of } from 'rxjs';

describe('ListContactsComponent', () => {
  let component: ListContactsComponent;
  let fixture: ComponentFixture<ListContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactsComponent, FilterPipe, FormatterPipe],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: Title,
          useValue: {
            setTitle() { }
          }
        }, {
          provide: ContactsService,
          useValue: {
            getData() { return of([]); }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
