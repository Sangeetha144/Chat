import { Component } from '@angular/core';
import { userDetails } from 'src/app/models/user.model';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: userDetails = new userDetails();  
  showPassword: boolean = false;
userData:any;
 

 constructor(
  private toastr:ToastrService,
  private auth:AuthService,
  private router:Router
 ){}
 

  login = new FormGroup({
   
    username: new FormControl(this.user.username, [Validators.required]),
    password: new FormControl(this.user.password, [Validators.required]),
   
  }, );

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  loginForm() {
    if (this.login.valid) {
      const username = this.login.value.username ?? '';
      const password = this.login.value.password  ?? '';

      this.auth.login(username, password).subscribe(
        (isLoggedIn) => {
          if (isLoggedIn) {
            this.toastr.success('Login successful');
            this.router.navigate(['/home']);
          } else {
            this.toastr.warning('Invalid credentials. Please try again.');
          }
        },
        () => {
          this.toastr.warning('An error occurred during login. Please try again.');
        }
      );
    } else {
      this.toastr.warning('Please fill all the fields');
    }
  }
}
