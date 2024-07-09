import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClassesService } from 'src/app/services/classes.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {

  classes: any = [];
  currentPage = 1;
  itemsPerPage = 10;
  prevLabel = 'السابق';
  nextLabel = 'التالي';
  loading = false;
  searchTerm: string = '';
  client_name = '';
  client_currency = '';

  constructor(
    private classesService: ClassesService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.getClasses();
    if(this.authService.isClient()){
      this.client_name = this.authService.getClientName();
      let currency = this.authService.getClientCurrency();
      this.client_currency = this.translate.instant(`currencies.${currency}`) ;
    }
  }

  ngOnInit(): void {
    
  }

  get filteredClasses() {
    if (!this.searchTerm) {
      return this.classes;
    }
    return this.classes.filter((classe: any) =>
      classe.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      classe.price.toString().includes(this.searchTerm) ||
      classe.capacity.toString().includes(this.searchTerm) ||
      classe.sessions.toString().includes(this.searchTerm) 
    );
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  getClasses() {
    this.loading = true;
    this.classesService.getClasses().subscribe(
      (response: any) => {
        this.loading = false;
        this.classes = response.data;
        if (this.classes.length == 0) {
          this.toastr.info('لا يوجد أنشطة رياضية حالياً');
        }
      },
      (error: any) => {
        this.loading = false;
        Swal.fire({
          title: 'خطأ في استرجاع بيانات الأنشطة الرياضية',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }

  changeClassStatus(id: number) { 
    this.loading = true;
    this.classesService.changeClassStatus(id).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success('تم تغيير حالة النشاط  بنجاح');
        this.getClasses();
      },
      (error: any) => {
        this.loading = false;
        Swal.fire({
          title: 'خطأ في تغيير حالة النشاط ',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }

  deleteClass(id: number) { 
    Swal.fire({
      title: 'هل أنت متأكد من حذف النشاط ؟',
      text: 'لا يمكن التراجع عن هذا الإجراء',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.classesService.deleteClass(id).subscribe(
          (response: any) => {
            this.loading = false;
            this.toastr.success('تم حذف النشاط  بنجاح');
            this.getClasses();
          },
          (error: any) => {
            this.loading = false;
            Swal.fire({
              title: 'خطأ في حذف النشاط ',
              text: error,
              icon: 'error',
              confirmButtonText: 'تم'
            });
          }
        );
      }
    });
  }

  classDetails(id: number) {
    this.router.navigate(['/classes/details', id]);
  }

}
