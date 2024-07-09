import { DecimalPipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService, DecimalPipe]
})
export class UsersComponent implements OnInit {

  users: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  prevLabel = 'السابق';
  nextLabel = 'التالي';

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
    
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data;
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
            title: 'خطأ في استرجاع بيانات المستخدمين',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

  showeUserRole(id: number){
    let user = this.users.find((user: { id: number; }) => user.id === id);
    let roles = user.roles;
    Swal.fire({
      title: 'صلاحيات المستخدم',
      html: `<ul>
              ${roles.map((role: any) => `<li><span class="badge badge-primary">${role.name}</span></li>`).join('')}
            </ul>`,
      confirmButtonText: 'تم'
    });
  }

  deleteUser(id: number) { 
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
        this.usersService.deleteUser(id).subscribe(
          (response: any) => {
            this.toastr.success('تم حذف المستخدم بنجاح');
            this.getUsers();
          },
          (error: any) => {
            Swal.fire({
              title: 'خطأ في حذف المستخدم',
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
