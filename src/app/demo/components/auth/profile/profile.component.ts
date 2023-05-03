import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/demo/domain/user';
import { StorageService } from 'src/app/demo/services/storage.service';
import { UserService } from 'src/app/demo/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:User;

  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
     this.getUsers();
  }

  private getUsers(){
    this.userService.getAllUsers()
    .subscribe((users)=>{
            this.user=users;  
            console.log("Array -> "+this.user)
        })
        
    } 
}
 