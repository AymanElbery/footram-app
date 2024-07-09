import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stat } from 'fs';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  clientForm: FormGroup;
  loading = false;
  selectedFile: File ;

  constructor(
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private router: Router,
    private logicService: LogicService,
    private toastr: ToastrService
  ) {

    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    
  }

  onFileSelected(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      // validation on file to be just png or jpg
      const mimeType = file.type;
      if(mimeType.match(/image\/*/) == null) {
        Swal.fire({ 
          title: 'خطأ في الصورة',
          text: 'الرجاء اختيار صورة صحيحة',
          icon: 'error',
          confirmButtonText: 'تم'
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e: any){
    const reader = e.target;
    this.selectedFile = reader.result;
  }

  addClient() {
    this.loading = true;
    if(this.clientForm.valid) {
      let data = this.clientForm.value;
      data.profile_image = this.selectedFile;
      this.clientsService.addClient(data).subscribe(
        (response: any) => {
          this.loading = false;
          this.toastr.success('تم إضافة الأكاديمية بنجاح');
          this.router.navigate(['/clients']);
        },
        (error: any) => {
          this.loading = false;
          Swal.fire({
            title: 'خطأ في إضافة الأكاديمية',
            text: error,
            icon: 'error',
            confirmButtonText: 'تم'
          });
        }
      );
    }else {
      this.loading = false;
      const errors = this.logicService.getFormValidationErrors(this.clientForm);
      Swal.fire({
        title: 'هناك خطأ في البيانات المدخلة',
        html: errors.join('<br/>'),
        icon: 'error',
        confirmButtonText: 'تم'
      });
    }
  }

}
