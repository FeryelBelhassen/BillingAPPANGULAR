import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PaymentComponent }
	])],
	exports: [RouterModule]
})

export class PaymentRoutingModule { }