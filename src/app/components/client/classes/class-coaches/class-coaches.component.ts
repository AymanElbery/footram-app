import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClassesService } from 'src/app/services/classes.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-class-coaches',
  templateUrl: './class-coaches.component.html',
  styleUrls: ['./class-coaches.component.scss']
})

export class ClassCoachesComponent implements OnInit {

    loading = false;
    callOnce = false;
    classCoaches: any = [];
    currentPage = 1;
    itemsPerPage = 10;
    prevLabel = 'السابق';
    nextLabel = 'التالي';

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

    }

    ngOnInit(): void {

    }

    setPage(page: number) {
        this.currentPage = page;
    }

    deleteCoach(id: number) {
    }

}
