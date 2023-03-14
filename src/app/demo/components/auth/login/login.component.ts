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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService,
    public layoutService: LayoutService, private route:Router,private tokenService: TokenService) {
    
     }
  

  ngOnInit(): void {

    this.form = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
  });

  }
  
  onSubmit():void {
    const { username, password } = this.form;
    this.authService.login(username,password).subscribe(data => {
      {
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveRefreshToken(data.refreshToken);
        this.tokenService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles; 
        if(this.isLoggedIn){
          this.route.navigate(['pages/home']);  
        } 
        else{
          console.log("Failed")
        }
      }
         
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }
  reloadPage(): void {
    window.location.reload();
  }
}