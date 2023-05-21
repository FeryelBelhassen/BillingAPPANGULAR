import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../services/stripe.service';
import { PaymentService } from '../../services/payment.service';
import { environment } from 'src/environments/environment';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private stripe: any = null;
  private card: any = null;
  private elements: any = null;
  public paymentError: string | null = null;
  public chargeError: any = null;
  public charge: any = null;
  //token!: string;
  //event!: string
  //result!: string;

  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentService: PaymentService
    ) { }

  public ngOnInit() {
    this.stripeService.initializeStripe().subscribe(() => {
      this.stripe = Stripe(environment.stripePublicKey);
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
      this.card.addEventListener('change',
        (event: any) => event.error ? this.paymentError = event.error.message : null);
    });
  }

  /**
   * Submits the Stripe token to the backend and creates a charge
   * @param token The Stripe.js token
   */
  public createPayment(token: string) {
    this.charge = null;
    this.chargeError = null;
    this.paymentService.createPayment(token, 999, 'usd', 'This is a sample charge')
    .subscribe(
      response => this.charge = response,
      error => this.chargeError = error
    );
  }

  /**
   * Gets a Stripe token from the Stripe.js API
   */
  public getToken() {
    this.stripe.createToken(this.card).then((result :any) => {
      if (result.error) {
        this.paymentError = result.error.message;
      } else {
        this.createPayment(result.token);
      }
    });
  }
}