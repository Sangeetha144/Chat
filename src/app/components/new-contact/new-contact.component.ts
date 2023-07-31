import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent {

  contactForm!: FormGroup; // Declare the form group variable
 

  constructor(
    private formBuilder: FormBuilder,
    private contactservice:ContactService,
    private toastr:ToastrService,
    private dialog:MatDialogRef<NewContactComponent>,
    private auth:AuthService
    ) {}

  ngOnInit() {
    // Initialize the form group and form controls
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required], // Use Validators for validation
      lastName: ['', Validators.required],
      phoneNo: ['', [Validators.required,Validators.maxLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const loggedInUserId = this.auth.getLoggedInUserId();
      console.log(loggedInUserId)
      if (loggedInUserId) {
        const contactData = {
          ...this.contactForm.value,
          userId: loggedInUserId 
        };

        this.contactservice.addContact(contactData).subscribe(
          (res:Contact) => {
            this.toastr.success("Contact added successfully");
           this.dialog.close();
          },
          (error) => {
            this.toastr.error("Failed to add contact");
          }
        );
      }
    } else {
      this.toastr.warning("Enter valid data");
    }
  }

}
