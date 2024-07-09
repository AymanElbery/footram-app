import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CoachesService } from 'src/app/services/coaches.service';

@Component({
  selector: 'app-coache-import',
  templateUrl: './coache-import.component.html',
  styleUrls: ['./coache-import.component.scss']
})
export class CoacheImportComponent implements OnInit {

  loading = false;
  data: any[] = [];
  coaches: any = [];

  constructor(
    private coachesService: CoachesService,
    private fb: FormBuilder,
    private router: Router,
    private logicService: LogicService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.prepareData();
      // Send data to backend
      
    };
    reader.readAsBinaryString(target.files[0]);
  }

  prepareData() {
    for (let i = 0; i < this.data.length; i++) { 
      const coach = {
        name: this.data[i][0],
        phone: "0" + this.data[i][1],
        status: this.data[i][2],
        national: this.data[i][3],
        client_id: this.authService.getClientId()
      };
      this.coaches.push(coach);
    }
  }

  importCoaches() {  
    this.loading = true;
    let coaches = { 'coaches': this.coaches };
    console.log(coaches);
    this.coachesService.importCoaches(coaches).subscribe(
      (response: any) => {
        this.loading = false;
        this.coaches = [];
        this.toastr.success('تم اضافة المدربين بنجاح');
        this.router.navigate(['/coaches']);
      },
      (error: any) => {
        this.loading = false;
        this.coaches = [];
        this.toastr.error('حدث خطأ اثناء اضافة المدربين');
      }
    );
  }
}
