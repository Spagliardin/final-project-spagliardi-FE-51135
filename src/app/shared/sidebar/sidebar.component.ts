import { UserService } from 'src/app/auth/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public hasToken: boolean = false

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    !!this.userService.token ? this.hasToken = true : this.hasToken = false
  }

  logout(){
    this.userService.logout()
  }

}
