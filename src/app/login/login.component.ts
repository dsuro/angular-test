import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginFailed:boolean=false;
  constructor(private formBuilder: FormBuilder,
      private router: Router,
      private route:ActivatedRoute,
      private authenticationService: AuthenticationService
  ) {


  }

  ngOnInit() {
     if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
      }
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      if(this.route && this.route.snapshot){
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      }
  }
  // convenience getter for easy access to form fields
  get formDetails() { return this.loginForm.controls; }
  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          this.loginFailed=true;
          return;
      }
      this.loading = true;
      this.authenticationService.login(this.formDetails.username.value, this.formDetails.password.value)
          .pipe(first())
          .subscribe(
              (data) => {
                  this.loginFailed=false;
                  this.router.navigate([this.returnUrl]);
              },
              (error) => {
                this.loginFailed=true;
                this.loading = false;
              });
  }
}
