import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent}
    ])],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class DashboardsRoutingModule { }