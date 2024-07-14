import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassesService } from 'src/app/services/classes.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { SessionsService } from 'src/app/services/sessions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  data: any;
  options: any;

  loading = false;
  coaches: any = [];
  classes: any = [];
  sessions: any = [];
  
  constructor(
    private coachesService: CoachesService,
    private classesService: ClassesService,
    private sessionsService: SessionsService,
    private authService: AuthService,
    private router: Router
  ) {

    this.getCoaches();
    this.getClasses();
    this.getAllSessions();


    this.data =  {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [ 5, 2, 3, 12, 19, 3],
          borderWidth: 1,
        },
      ],
    };

    this.options = {
      type: 'bar',
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#EDEDED',
          },
        },
        x: {
          grid: {
            color: '#EDEDED',
          },
        }
      },
    };
  }

  ngOnInit(): void {

  }

  getCoaches() {
    this.loading = true;
    this.coachesService.getCoaches().subscribe(
      (response: any) => {
        this.loading = false;
        this.coaches = response.data;
      },
      (error: any) => {
        this.loading = false;
        console.log(error);
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

  getClasses() {  
    this.loading = true;
    this.classesService.getClasses().subscribe(
      (response: any) => {
        this.loading = false;
        this.classes = response.data;
      },
      (error: any) => {
        this.loading = false;
        this.loading = false;
        console.log(error);
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
          Swal.fire({
            title: 'خطأ في استرجاع بيانات الأنشطة',   
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

  getAllSessions() {
    this.loading = true;
    this.sessionsService.getAllSessions().subscribe(
      (response: any) => {
        this.loading = false;
        this.sessions = response.data;
      },
      (error: any) => {
        this.loading = false;
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
          Swal.fire({
            title: 'خطأ في استرجاع بيانات حصص التدريب',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      }
    );
  }

}
