import { User } from './../../auth/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user?.subscribe({
      next: (res) => {
        this.userName = res.name 
      }
    })
  }

}
