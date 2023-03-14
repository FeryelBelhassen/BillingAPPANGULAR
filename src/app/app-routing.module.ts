import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";


@NgModule({
  imports: [
    RouterModule.forRoot([{
      path: '', component: AppLayoutComponent,
      canActivate: [AuthGuard],
      children: [
          { path: 'dash', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'user', loadChildren: () => import('./demo/components/user/user.module').then(m => m.UserModule) },
          { path: 'facture', loadChildren: () => import('./demo/components/facture/facture.module').then(m => m.FactureModule) }               
      ]
  },
  { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
