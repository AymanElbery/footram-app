import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClassesService } from 'src/app/services/classes.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  loading = false;
  callOnce = false;
  classData: any = {};
  client_currency = '';
  classSessions: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  prevLabel = 'السابق';
  nextLabel = 'التالي';
  searchTerm: string = '';
  classId: any;

  constructor(
    private classesService: ClassesService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logicService: LogicService,
    private toastr: ToastrService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    if(this.authService.isClient()){
      let currency = this.authService.getClientCurrency();
      this.client_currency = this.translate.instant(`currencies.${currency}`) ;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.classId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.classId && !this.callOnce){
        this.getClassDetails(this.classId);
      }
    });
  }

  getClassDetails(id: any) {
    this.callOnce = true;
    this.loading = true;
    this.classesService.getClassDetails(id).subscribe(
      (response: any) => {
        this.loading = false;
        this.classData = response.data;
      },
      (error: any) => {
        if(error == "Unauthenticated."){
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
          this.loading = false;
          Swal.fire({
            title: 'خطأ في استرجاع بيانات النشاط ',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }
}
