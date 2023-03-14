import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/demo/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/demo/api/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  roles = [
    { id: 3, name: "User" },
    { id: 1, name: "Admin" },
    { id: 2, name: "Agent" },
    { id: 4, name: "Magasinier" },
    { id: 5, name: "Client" }
  ];
  
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form!: FormGroup;

  constructor(private authService: AuthService, private fb:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.form= new FormGroup ({
      username: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      role: new FormControl('', Validators.required)   
    })
}

  onSubmit(): void {

    console.log(this.form.value)
    this.authService.register(this.form.value.username, this.form.value.email,
      this.form.value.password, [this.form.value.role]).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.route.navigate(['/auth/login'])
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}