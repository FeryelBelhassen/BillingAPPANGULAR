import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { PagesModule } from './pages.module';


@NgModule({
    imports: [
        RouterModule.forChild([
            {path:'home', loadChildren:() => import('./dashboard/dashboard.module').then(m=> m.DashboardModule), canActivate:[AuthGuard]}

        ])
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class PagesRoutingModule { }