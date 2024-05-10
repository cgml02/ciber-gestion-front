import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { HomeComponent } from "./home/home.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@NgModule({
    declarations: [HomeComponent, NavBarComponent],
    imports: [DashboardRoutingModule, ReactiveFormsModule, CommonModule],
})
export class DashboardModule {}
