import { UserService } from 'src/app/auth/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public hasToken$?: Observable<boolean>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.hasToken$ = this.userService.isToken$
  }

  logout(){
    this.userService.logout()
  }

}
