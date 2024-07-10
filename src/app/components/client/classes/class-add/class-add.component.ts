import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent implements OnInit {

  classForm: FormGroup;
  loading = false;

  weekdays : any[] = [];
  selectedItems : any[] = [];
  dropdownSettings : any = {};

  constructor(
    private classesService: ClassesService,
    private fb: FormBuilder,
    private router: Router,
    private logicService: LogicService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      capacity: ['', Validators.required],
      sessions: ['', Validators.required],
      days: ['', Validators.required],
      start_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.weekdays = this.logicService.getWeekdays();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: ' الكل',
      unSelectAllText: 'إلغاء الكل',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  addClass() {
    this.loading = true;
    if(this.classForm.valid) {
      let data = this.classForm.value;
      data.client_id = this.authService.getClientId();
      this.classesService.addClass(data).subscribe(
        (response: any) => {
          this.loading = false;
          this.toastr.success('تم إضافة النشاط بنجاح');
          this.router.navigate(['/classes']);
        },
        (error: any) => {
          this.loading = false;
          Swal.fire({
            title: 'خطأ في إضافة النشاط',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    }else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.classForm);
      Swal.fire({
        title: 'هناك خطأ في البيانات',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

}
