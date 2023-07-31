import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { userDetails } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: userDetails = new userDetails();  
  showPassword: boolean = false;
  showConPassword:boolean=false;

constructor(
  private toastr:ToastrService,
  private auth:AuthService,
  private router:Router
  
  ){}

  register = new FormGroup({
    username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(10)]),
    mobile: new FormControl(this.user.mobile, [Validators.required, Validators.max(10)]),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    password: new FormControl(this.user.password, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]),
    conpassword: new FormControl(this.user.conpassword)
  }, {
    validators: this.passwordMatchValidator('password', 'conpassword')
  });
 
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConPasswordVisibility() {
    this.showConPassword = !this.showConPassword;
  }

  passwordMatchValidator(password: any, conpassword: any) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordValue = formGroup.get(password)?.value;
      const conpasswordValue = formGroup.get(conpassword)?.value;

      if (passwordValue !== conpasswordValue) {
        formGroup.get(conpassword)?.setErrors({ passwordMatchValidator: true });
      } 

     return null
    };
  }

  registerForm()
  {
    if(this.register.valid)
    {
      this.auth.RegisteredUser(this.register.value).subscribe(res=>
        {
          this.toastr.success("registered successfully");
          this.router.navigate(['login']);
        })
    }
    else
    {
      this.toastr.warning("Enter Valid data");
    }
  }


}

