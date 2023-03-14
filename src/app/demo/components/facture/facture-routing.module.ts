import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FactureComponent } from './facture.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'facture', component: FactureComponent }
	])],
	exports: [RouterModule]
})
export class FactureRoutingModule { }