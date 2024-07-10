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
  loading2 = false;
  callOnce = false;
  classData: any = {};
  client_currency = '';
  classSessions: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  prevLabel = 'السابق';
  nextLabel = 'التالي';
  searchTerm: string = '';

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
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id && !this.callOnce){
        this.getClass(id);
      }
    });
  }

  get filteredClassSessions() {
    if (!this.searchTerm) {
      return this.classSessions;
    }
    
    return this.classSessions.filter((classSession: any) =>  
      classSession.date.toLowerCase().includes(this.searchTerm.toLowerCase()) 
    );
  }
  

  getClass(id: any) {
    this.callOnce = true;
    this.loading = true;
    this.classesService.getClass(id).subscribe(
      (response: any) => {
        this.loading = false;
        this.classData = response.data;
        this.getClassSessions();
      },
      (error: any) => {
        this.loading = false;
        Swal.fire({
          title: 'خطأ في استرجاع بيانات النشاط ',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }

  getClassSessions() {
    this.loading2 = true;
    this.classesService.getClassSessions(this.classData.id).subscribe(
      (response: any) => {
        this.loading2 = false;
        this.classSessions = response.data;
        if(this.classSessions.length == 0){
          this.toastr.info('لا توجد حصص تدريبية لهذا النشاط');
        }
      },
      (error: any) => {
        this.loading2 = false;
        Swal.fire({
          title: 'خطأ في استرجاع بيانات حصص تدريبية ',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }


  generateClassSessions() {
    this.loading2 = true;
    let data = { 'class_id': this.classData.id};
    this.classesService.generateClassSessions(data).subscribe(
      (response: any) => {
        this.loading2 = false;
        this.toastr.success('تم إنشاء الحصص التدريبية بنجاح');
        this.getClassSessions();
      },
      (error: any) => {
        this.loading2 = false;
        Swal.fire({
          title: 'خطأ في إنشاء الحصص التدريبية ',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }

  changeClassSessionStatus(id: number) {
    this.loading2 = true;
    this.classesService.changeClassSessionStatus(id).subscribe(
      (response: any) => {
        this.loading2 = false;
        this.toastr.success('تم تغيير حالة الحصة التدريبية بنجاح');
        this.getClassSessions();
      },
      (error: any) => {
        this.loading2 = false;
        Swal.fire({
          title: 'خطأ في تغيير حالة الحصة التدريبية ',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }

  setPage(page: number) {
    this.currentPage = page;
  }


  deleteClassSession(id: number) {

  }

}
