import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: any = [];
  loading = false;
  currentPage = 1;
  itemsPerPage = 5;
  prevLabel = 'السابق';
  nextLabel = 'التالي';
  message = '';

  constructor(
    private clientsService: ClientsService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getClients();
  }

  ngOnInit(): void {
    
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  getClients() {
    this.loading = true;
    this.clientsService.getClients().subscribe(
      (response: any) => {
        this.loading = false;
        this.clients = response.data;
        if(this.clients.length == 0){
          this.message = response.message;
        }
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
            title: 'خطأ في استرجاع بيانات الأكاديميات',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }


  deleteClient(id: number) { 
    Swal.fire({
      title: 'هل أنت متأكد؟',
      html: "لا يمكن التراجع عن هذا الإجراء<br> كما أنه سيؤدي إلى حذف جميع البيانات المتعلقة بهذه الأكاديمية!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientsService.deleteClient(id).subscribe(
          (response: any) => {
            this.toastr.success('تم حذف الأكاديمية بنجاح');
            this.getClients();
          },
          (error: any) => {
            Swal.fire({
              title: 'خطأ في حذف الأكاديمية',
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
