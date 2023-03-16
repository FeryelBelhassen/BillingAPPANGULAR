import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/demo/services/auth.service';
import { StorageService } from 'src/app/demo/services/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Validators,FormControl,FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/demo/services/token.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Panel } from 'primeng/panel';
import { ActivatedRoute, Router } from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
    
  submitted = false;
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: string = '/' ;
  error = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService,
    public layoutService: LayoutService, private route:Router,private tokenService: TokenService,
    private router:ActivatedRoute) {
      if (this.authService.userValue) { 
        this.route.navigate(['/pages/home'])
    
     }
    }
  

  ngOnInit(): void {

    this.form = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
  }
  
  onSubmit():void {


    
    const { username, password } = this.form;
    
    this.authService.login(username,password)
    .subscribe({
      next: (data: any) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true; 
        this.route.navigate(['pages/home']);
      },
      error: err => {
        console.log(err )
         this.isLoginFailed = true;
      }
    });
   

  }

  
  reloadPage(): void {
    window.location.reload();
  }
}