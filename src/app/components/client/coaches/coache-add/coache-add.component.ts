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
import { AuthService } from 'src/app/services/auth.service';
import { CoachesService } from 'src/app/services/coaches.service';

@Component({
  selector: 'app-coache-add',
  templateUrl: './coache-add.component.html',
  styleUrls: ['./coache-add.component.scss']
})
export class CoacheAddComponent implements OnInit {

  coachForm: FormGroup;
  nationalities: any = [];
  loading = false;

  constructor(
    private coachesService: CoachesService,
    private fb: FormBuilder,
    private router: Router,
    private logicService: LogicService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {

    this.getNationalities();

    this.coachForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      national_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  getNationalities() { 
    this.loading = true;
    this.coachesService.getNationalities().subscribe(
      (response: any) => {
        this.loading = false;
        this.nationalities = response.data;
      },
      (error: any) => {
        this.loading = false;
        Swal.fire({
          title: 'خطأ في استرجاع بيانات ',
          text: error,
          icon: 'error',
          confirmButtonText: 'تم'
        });
      }
    );
  }


  addCoach() {
    this.loading = true;
    if(this.coachForm.valid) {
      let data = this.coachForm.value;
      data.client_id = this.authService.getClientId();
      this.coachesService.addCoache(data).subscribe(
        (response: any) => {
          this.loading = false;
          this.toastr.success('تم إضافة المدرب بنجاح');
          this.router.navigate(['/coaches']);
        },
        (error: any) => {
          this.loading = false;
          Swal.fire({
            title: 'خطأ في إضافة المدرب',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    }else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.coachForm);
      Swal.fire({
        title: 'هناك خطأ في البيانات',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

}
