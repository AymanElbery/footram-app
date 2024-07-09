import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService{

    constructor(
        private translate: TranslateService
    ) {

    }

    getFormValidationErrors(form : any) {
        const errors: string[] = [];
        Object.keys(form.controls).forEach(key => {
          const controlErrors = form.get(key)?.errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              errors.push(this.translate.instant(`form.${key}.${keyError}`));
            });
          }
        });
        return errors;
    }

    getWeekdays() {
      return [
        { item_id: 6, item_text: 'السبت' },
        { item_id: 7, item_text: 'الأحد' },
        { item_id: 1, item_text: 'الاثنين' },
        { item_id: 2, item_text: 'الثلاثاء' },
        { item_id: 3, item_text: 'الأربعاء' },
        { item_id: 4, item_text: 'الخميس' },
        { item_id: 5, item_text: 'الجمعة' }
      ];
    }
}
