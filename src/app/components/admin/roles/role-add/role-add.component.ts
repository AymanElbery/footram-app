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

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  roleForm: FormGroup;
  clients: any = [];
  roles: any = [];
  loading = false;

  constructor(
    private clientsService: ClientsService,
    private rolesService: RolesService,
    private fb: FormBuilder,
    private router: Router,
    private logicService: LogicService,
    private toastr: ToastrService
  ) {

    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  addRole() {
    this.loading = true;
    if(this.roleForm.valid) {
      this.rolesService.addRole(this.roleForm.value).subscribe(
        (response: any) => {
          this.loading = false;
          this.toastr.success('تم إضافة الصلاحية بنجاح');
          this.router.navigate(['/roles']);
        },
        (error: any) => {
          this.loading = false;
          Swal.fire({
            title: 'خطأ في إضافة الصلاحية',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    }else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.roleForm);
      Swal.fire({
        title: 'هناك خطأ رمز التحقق',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

}
