import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProfileGuard } from "../../guards/profile.guard";
import { TokenGuard } from "../../guards/token.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        canActivate: [TokenGuard, ProfileGuard],
    },
    { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
