import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public dark: boolean = this.layout.config.settings.layout_version == 'dark-only' ? true : false;

  collapseSidebar: boolean = true;
  client_name = '';

  constructor(
    private navServices: NavService, 
    public layout: LayoutService,
    private authService: AuthService
  ) {
    if(this.authService.isClient()){
      this.client_name = this.authService.getClientName();
    }
  }

  sidebarToggle( ) {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  layoutToggle() {
    this.dark = !this.dark;
    this.layout.config.settings.layout_version = this.dark ? 'dark-only' : 'light';
  }

  searchToggle(){
    this.navServices.search = true;
  }

  ngOnInit(): void {
    
  }
 
  
}
