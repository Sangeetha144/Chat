import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userDetails } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  loggedInUser: userDetails | null = null;
constructor(
  private auth:AuthService ,
  private route:ActivatedRoute,
  ){}






}
