import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contactlisting',
  templateUrl: './contactlisting.component.html',
  styleUrls: ['./contactlisting.component.css']
})
export class ContactlistingComponent {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService,
    private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
    // Get the logged-in user ID (assuming you have a method to get the user ID in your AuthService)
    const loggedInUserId = this.auth.getLoggedInUserId();

    // Fetch contacts for the logged-in user
    this.contactService.getContactsForUser(loggedInUserId).subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
  onContactClick(contact: Contact) {
    this.router.navigate(['', { outlets: { chat: ['chat', contact.id] } }]);
  }
}
