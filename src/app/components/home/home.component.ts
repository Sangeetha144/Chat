import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { userDetails } from 'src/app/models/user.model';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 user:userDetails = new userDetails
  id!:number;
constructor(
  private auth:AuthService,
  private toastr:ToastrService,
  private router:Router,
  private dialog:MatDialog,
  private themeService: ThemeService,
)
  

  
  {} 

 logout()
 {
 this.auth.logout();
 this.toastr.success("Logout Successful");
 this.router.navigate(['/login']);
 }

openDialog()
{
  this.dialog.open(NewContactComponent,
    {
      width:'37%',
      height:'470px'

    })
}

ngOnInit() {
  // Apply the initial theme when the component loads
  const initialTheme = this.themeService.getTheme();
  this.themeService.applyTheme(initialTheme);

}



changeTheme(theme: string) {
  if (theme !== undefined) {
    this.themeService.setTheme(theme);
     // Update the navigation bar when the theme changes
  }
}

 

}
