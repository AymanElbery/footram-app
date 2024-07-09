import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { NavService } from 'src/app/shared/services/nav.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  user: any;
  roles: any;
  current_role_id: string;
  public profileImg: 'assets/images/dashboard/profile.jpg';
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private toastr: ToastrService,
    private navService: NavService
  ) {
    this.user = this.authService.getAuthUser();
    this.roles = this.user.roles;
    this.current_role_id = this.user.current_role_id;
  }
  
  ngOnInit(): void {
    
  }

  change_role(role_id: string) {
    this.loading = true;
    this.userService.changeUserCurrentRole(role_id).subscribe(
      (response: any) => {
        this.loading = false;
        this.authService.changeRole(role_id);
        this.navService.updateMenu();
        this.toastr.success('تم تغيير الصلاحيات بنجاح', 'تم');
        location.reload();
      },
      (error: any) => {
        this.loading = false;
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
            title: 'خطأ في تغيير الصلاحيات',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

}
