import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { DashboardComponent } from './demo/components/pages/dashboard/dashboard.component';

/*const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('./demo/components/pages/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard]},
      { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)},
  
    ]
    }
 
 ];*/

@NgModule({
  imports: [
    //RouterModule.forRoot(routes)

    RouterModule.forRoot([{
      path: '', component: AppLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)},
        { path: 'dashboard', loadChildren: () => import('./demo/components/pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
      ]   
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
    ], 
    { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
