import { DecimalPipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CoachesService } from 'src/app/services/coaches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit {

  coaches: any = [];
  currentPage = 1;
  itemsPerPage = 10;
  prevLabel = 'السابق';
  nextLabel = 'التالي';
  loading = false;
  searchTerm: string = '';
  client_name = '';

  constructor(
    private coachesService: CoachesService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getcoaches();
    if(this.authService.isClient()){
      this.client_name = this.authService.getClientName();
    }
  }

  ngOnInit(): void {
    
  }

  get filteredCoaches() {
    if (!this.searchTerm) {
      return this.coaches;
    }
    return this.coaches.filter((coache : any) =>
      coache.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      coache.phone.toString().includes(this.searchTerm) || 
      coache.nationality.toString().includes(this.searchTerm)
    );
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  getcoaches() {
    this.loading = true;
    this.coachesService.getCoaches().subscribe(
      (response: any) => {
        this.loading = false;
        this.coaches = response.data;
        if (this.coaches.length == 0) {
          this.toastr.info('لا يوجد مدربين');
        }
      },
      (error: any) => {
        this.loading = false;
        if(error == 'Unauthenticated.'){
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
            title: 'خطأ في استرجاع بيانات المدربين',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

  changeCoacheStatus(id: number) { 
    this.loading = true;
    this.coachesService.changeCoacheStatus(id).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success('تم تغيير حالة المدرب بنجاح');
        this.getcoaches();
      },
      (error: any) => {
        this.loading = false;
        Swal.fire({
          title: 'خطأ في تغيير حالة المدرب',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }

  deleteCoache(id: number) { 
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
        this.coachesService.deleteCoache(id).subscribe(
          (response: any) => {
            this.toastr.success('تم حذف المدرب بنجاح');
            this.getcoaches();
          },
          (error: any) => {
            Swal.fire({
              title: 'خطأ في حذف المدرب',
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
