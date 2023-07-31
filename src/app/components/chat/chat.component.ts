import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  contactId!: number;
  contact: Contact | undefined; // Assuming you have the Contact model

 
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.contactId = +params['contactId']; // Convert to a number if needed
      this.contactService.getContactById(this.contactId).subscribe((contact) => {
        this.contact = contact;
      });
    });
  }

}
