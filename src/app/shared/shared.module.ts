import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HeaderComponent } from "./components/header/header/header.component";
import { ContentComponent } from "./components/layout/content/content.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

import { NavService } from "./services/nav.service";
import { FeatherIconComponent } from "./components/feather-icon/feather-icon.component";
import { RouterModule } from "@angular/router";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { TapToTopComponent } from "./components/tap-to-top/tap-to-top.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BookmarkComponent } from "./components/header/header/bookmark/bookmark.component";
import { CartComponent } from "./components/header/header/cart/cart.component";
import { NotificationComponent } from "./components/header/header/notification/notification.component";
import { MaximizeComponent } from "./components/header/header/maximize/maximize.component";
import { RolesComponent } from "./components/header/header/roles/roles.component";
import { AccountComponent } from "./components/header/header/account/account.component";
import { ModeComponent } from "./components/header/header/mode/mode.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "./components/loader/loader.component";
import { FullComponent } from "./components/layout/full/full.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { DecimalPipe } from "@angular/common";
import { SearchComponent } from "./components/header/header/search/search.component";
import { SearchCustomizeComponent } from "./components/header/header/search-customize/search-customize.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    FeatherIconComponent,
    BreadcrumbComponent,
    TapToTopComponent,
    FooterComponent,
    BookmarkComponent,
    CartComponent,
    NotificationComponent,
    MaximizeComponent,
    RolesComponent,
    AccountComponent,
    ModeComponent,
    LoaderComponent,
    FullComponent,
    SearchComponent,
    SearchCustomizeComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule, AngularSvgIconModule.forRoot()],
  providers: [NavService, DecimalPipe],
  exports: [RouterModule, BreadcrumbComponent, TapToTopComponent, FeatherIconComponent, ContentComponent, LoaderComponent, NgbModule, AngularSvgIconModule],
})
export class SharedModule {}
