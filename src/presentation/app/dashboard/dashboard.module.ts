import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [HomeComponent, NavBarComponent],
  imports: [DashboardRoutingModule],
})
export class DashboardModule {}
