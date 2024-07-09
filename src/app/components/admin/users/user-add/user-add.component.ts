import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stat } from 'fs';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  clients: any = [];
  roles: any = [];
  loading = false;

  constructor(
    private usersService: UsersService,
    private clientsService: ClientsService,
    private rolesService: RolesService,
    private fb: FormBuilder,
    private router: Router,
    private logicService: LogicService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {

    this.getClients();
    this.getRoles();

    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      snn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      client_id: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  getClients() { 
    this.clientsService.getClients().subscribe(
      (response: any) => {
        this.clients = response.data;
      },
      (error: any) => {
        if(error.status == 401){
          Swal.fire({
            title: 'إنتهاء صلاحية الدخول',
            text: 'لقد انتهت صلاحية الدخول الخاصة بك، يرجى تسجيل الدخول مرة أخرى',
            icon: 'warning',
            timerProgressBar: true,
            timer: 5000,
            showConfirmButton: false,
            willClose: () => {
              this.authService.logout();
              this.router.navigate(['/login']);
            }
          });
        }else{
          Swal.fire({
            title: 'خطأ في استرجاع بيانات العملاء',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

  getRoles() { 
    this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
      },
      (error: any) => {
        if(error.status == 401){
          Swal.fire({
            title: 'إنتهاء صلاحية الدخول',
            text: 'لقد انتهت صلاحية الدخول الخاصة بك، يرجى تسجيل الدخول مرة أخرى',
            icon: 'warning',
            timerProgressBar: true,
            timer: 5000,
            showConfirmButton: false,
            willClose: () => {
              this.authService.logout();
              this.router.navigate(['/login']);
            }
          });
        }else{
          Swal.fire({
            title: 'خطأ في استرجاع بيانات الصلاحيات',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

  addUser() {
    this.loading = true;
    if(this.userForm.valid) {
      this.usersService.addUser(this.userForm.value).subscribe(
        (response: any) => {
          this.loading = false;
          this.toastr.success('تم إضافة المستخدم بنجاح');
          this.router.navigate(['/users']);
        },
        (error: any) => {
          this.loading = false;
          Swal.fire({
            title: 'خطأ في إضافة المستخدم',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    }else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.userForm);
      Swal.fire({
        title: 'هناك خطأ رمز التحقق',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

}
