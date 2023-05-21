import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * Creates a charge from a Stripe.js token
   * @param cardToken Token provided by Stripe.js
   * @param price The price of the item(s) you are selling
   * @param currency The currency
   * @param description A description of the item(s)
   */
  public createPayment(cardToken: any, price: number, currency: string, description: string) {
    const chargeRequest = {
      token: cardToken.id,
      price,
      description,
      currency
    };
    return this.httpClient.post(`${environment.baseUrl}/payment`, chargeRequest, { headers: this.headers });
  }
}