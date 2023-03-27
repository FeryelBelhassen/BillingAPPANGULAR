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
        { path: 'home', loadChildren: () => import('./demo/components/pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
        { path: 'users', loadChildren: () => import('./demo/components/user/user.module').then(m => m.UserModule)},
        { path: 'facture', loadChildren: () => import('./demo/components/facture/facture.module').then(m => m.FactureModule)},
        { path: 'product', loadChildren: () => import('./demo/components/product/product.module').then(m => m.ProductModule)},
        { path: 'client', loadChildren: () => import('./demo/components/client/client.module').then(m => m.ClientModule)},
        { path: 'devis', loadChildren: () => import('./demo/components/devis/devis.module').then(m => m.DevisModule)},
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
