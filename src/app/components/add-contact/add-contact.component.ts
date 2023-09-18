import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {

  newName: string = '';
  newEmail: string = '';
  newPhone: string = '';

  invalid: boolean = false;


  contactForm = new FormGroup({
    newName: new FormControl('', Validators.required),
    newEmail: new FormControl('', Validators.required),
    newPhone: new FormControl('', Validators.required)
  });

  constructor(
    public oS: OverlayService,
    private router: Router,
    public dataService: DataService
  ) { }


  async createContact() {
    if (this.newName == '' || this.newEmail == '' || this.newPhone == '') {
      this.invalid = true;
      return;
    }
    let contact = new Contact(0, this.newName, this.newEmail, this.newPhone);
    await this.dataService.createContact(contact);
    this.closeContactForm();
  }


  closeContactForm() {
    this.newName = '';
    this.newEmail = '';
    this.newPhone = '';
    this.invalid = false;
    this.oS.contactOverlayVisible = false;
  }

}
