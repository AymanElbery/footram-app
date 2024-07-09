import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}
@Injectable({
  providedIn: "root",
})
export class NavService {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;


  role: number;
  MENUITEMS: Menu[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
        }
        if (evt.target.innerWidth < 1199) {
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
      });
    }

    this.updateMenu();
  }

  updateMenu() {
    this.role = this.authService.getAuthUser().current_role_id;
    
    switch (this.role) {
      case 1:
        this.MENUITEMS = [
          { path: "/home", icon: "home", title: "الصفحة الرئيسية", type: "link" },
          { path: "/clients", icon: "bookmarks", title: "إدارة الأكاديميات", type: "link" },
          { path: "/roles", icon: "bookmarks", title: "إدارة الصلاحيات", type: "link" },
          { path: "/users", icon: "users", title: "إدارة المستخدمين", type: "link" },
          { path: "/reports", icon: "tables", title: "التقارير", type: "link" },
          { path: "/forms", icon: "ecommerce", title: "إدارة الباقات", type: "link" },
          { path: "/invoices", icon: "cart", title: "الفواتير الإلكترونية", type: "link" },
        ]
        break;
      case 2:
        this.MENUITEMS = [
          { path: "/dashboard", icon: "home", title: "لوحة التحكم", type: "link" },
          { path: "/coaches", icon: "contacts", title: "المدربين", type: "link" },
          { path: "/classes", icon: "editors", title: "الأنشطة الرياضية", type: "link" },
          { path: "/players", icon: "users", title: "اللاعبين", type: "link" },
        ];
        break;
    }
    this.items.next(this.MENUITEMS);
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
