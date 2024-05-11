import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DataModule } from "../../data/data.module";
import { AuthService } from "../../domain/services/auth.service";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DataModule,
        AuthModule,
        DashboardModule,
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
