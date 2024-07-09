import { Component, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { delay, map, withLatestFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('@.disabled')
  public animationsDisabled = true;

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private translate: TranslateService
  ) {
    this.translate.use("ar");
  }

  
}
