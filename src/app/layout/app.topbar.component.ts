import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { SlideMenu } from 'primeng/slidemenu';
import { ContextMenu } from 'primeng/contextmenu';
declare var myScript: any;
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    showMenu = false;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
    
    ngOnInit() {
        
    
    }
    toggleMenu(){
        this.showMenu = !this.showMenu;
    }
  
}
