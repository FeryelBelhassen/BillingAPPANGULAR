import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StorageService } from './demo/services/storage.service';
import { AuthService } from './demo/services/auth.service';
import { EventService } from './demo/services/event.service';
import { LayoutService } from './layout/service/app.layout.service';
import { UserService } from './demo/services/user.service';
import { FactureService } from './demo/services/facture.service';
import { Subscription } from 'rxjs';
import { TokenService } from './demo/services/token.service';
import { Router } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  eventBusSub?: Subscription;
  constructor(private primengConfig: PrimeNGConfig,private layoutService: LayoutService,
    private storageService: StorageService,
    private authService: AuthService,
    private eventService: EventService,
    private userService: UserService,
    private factureService: FactureService,
    private tokenService: TokenService,
    private route:Router) { }

  ngOnInit() {
      this.primengConfig.ripple = true;
      
  
}
}
