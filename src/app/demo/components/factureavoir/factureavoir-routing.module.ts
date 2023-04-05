import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FactureAvoirComponent } from './factureavoir.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FactureAvoirComponent }
	])],
	exports: [RouterModule]
})
export class FactureAvoirRoutingModule { }