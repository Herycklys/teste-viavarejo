import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';

import { ValidCpf } from '../custom-validators/cpf.validator';
import { ValidRequiredNoSpace } from '../custom-validators/requiredWithNoSpace.validator';
import { ValidExists } from '../custom-validators/exists.validator';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  id: number;

  wasSent: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contactService: ContactsService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const validExists = new ValidExists(this.contactService);

    let paramId;

    this.contactForm = this.formBuilder.group({
      name: ['', ValidRequiredNoSpace],
      cpf: ['', [ValidRequiredNoSpace, ValidCpf], validExists.validate('cpf')],
      phone: ['', [ValidRequiredNoSpace, Validators.minLength(11)]],
      email: ['', [ValidRequiredNoSpace, Validators.email], validExists.validate('email')]
    });

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        paramId = id;

        validExists.setId(Number(id));

        return this.contactService.getById(Number(id));
      })
    ).subscribe(value => {

      if (!value) {
        if (paramId === 'novo') {
          this.titleService.setTitle('Novo contato');
        } else {
          this.router.navigate(['erro-404']);
        }

        return;
      }

      this.id = value.id;

      delete value.id;

      this.contactForm.setValue(value);

      this.titleService.setTitle(value.name);
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    const contact = this.contactForm.value;

    if (this.contactForm.invalid) return;

    if (this.id) contact.id = this.id;

    this.contactService.save(contact).subscribe(
      () => {
        this.wasSent = true;

        if (!this.id) this.contactForm.reset();
        else this.titleService.setTitle(contact.name);
      }
    );
  }

}
