import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: any = [];

  constructor(
    private rolesService: RolesService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getRoles();
  }

  ngOnInit(): void {
    
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


  deleteRole(id: number) { 
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.deleteRole(id).subscribe(
          (response: any) => {
            this.toastr.success('تم حذف الصلاحية بنجاح');
            this.getRoles();
          },
          (error: any) => {
            Swal.fire({
              title: 'خطأ في حذف الصلاحية',
              text: error,
              icon: 'error',
              confirmButtonText: 'تم'
            });
          }
        );
      }
    });
  }

}
