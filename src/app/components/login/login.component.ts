import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-sample-page3',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  otpForm: FormGroup;
  snnIsNumber = true;
  phoneIsNumber = true;
  otp = false;
  otpString: any = '';
  loading = false;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private logicService : LogicService
  ) {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      snn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {
    
  }

  onSnnChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    // check if the input value is a number
    if (isNaN(Number(inputValue))) {
      this.snnIsNumber = false;
    }else{
      this.snnIsNumber = true;
    }
  }

  onPhoneChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    // check if the input value is a number
    if (isNaN(Number(inputValue))) {
      this.phoneIsNumber = false;
    }else{
      this.phoneIsNumber = true;
    }
  }

  getFormValidationErrors(form : any) {
    const errors: string[] = [];
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push(this.translate.instant(`form.${key}.${keyError}`));
        });
      }
    });
    return errors;
  }

  showOtp(){
    this.otp = true;
    this.otpString = localStorage.getItem('otp');

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  submit(){
    this.loading = true;
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.httpService.post('login', data).subscribe(
        (response: any) => {
          this.loading = false;
          localStorage.setItem('snn', response.data.snn);
          localStorage.setItem('otp', response.data.otp); // TODO: remove this line
          this.showOtp();
        },
        (message) => {
          this.loading = false;
          Swal.fire({
            title: 'هناك خطأ في الدخول',
            text: message,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    } else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.loginForm);
      Swal.fire({
        title: 'هناك خطأ في الدخول',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

  submit_otp(){
    this.loading = true;
    if (this.otpForm.valid) {
      const data = this.otpForm.value;
      data.snn = localStorage.getItem('snn');
      this.httpService.post('validate-otp', data).subscribe(
        (response: any) => {
          this.loading = false;
          localStorage.removeItem('snn');
          this.authService.setUser(response);
          if(this.authService.isAdmin()){
            this.router.navigate(['/home']);
          }else{
            this.router.navigate(['/dashboard']);
          }
        },
        (message) => {
          this.loading = false;
          Swal.fire({
            title: 'هناك خطأ في الدخول',
            text: message,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    } else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.otpForm);
      Swal.fire({
        title: 'هناك خطأ رمز التحقق',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

}
