import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef
  private tempUserEmail?: string

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,) { }
              
  ngAfterViewInit(): void {
    this.googleInit()
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe({
      next: (ok) => {
        if(ok) this.router.navigate(['/']).then(() => window.location.reload());
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: environment.google.CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    this.userService.loginGoogle(response.credential)
      .subscribe({
        next: ({ok, payload}) => {
          if(ok) this.router.navigate(['/']).then(() => window.location.reload());
          this.tempUserEmail = payload.email
      },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
      },
        complete: () => {
          google.accounts.id.revoke(this.tempUserEmail, () => {})
      }
    })
  }
}
