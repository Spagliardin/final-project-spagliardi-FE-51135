import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName: string = ''

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.userService.validateToken().subscribe({
      next: (ok) => {
        if (ok) {
          this.userName = this.userService.user?.name!
        }
      }
    })
  }

}
