import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
import { Characteristic } from '../../models/characteristic.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  discount: number = 0;
  finalPrice: number = 0;
  constructor(private dataService: DataService) {
    this.loadCartItems();
  }
  loadCartItems() {
    this.cartItems = this.dataService.getCartItems();
    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
    this.discount = this.totalPrice * 0.1; // 10% discount
    this.finalPrice = this.totalPrice - this.discount;
  }
  removeFromCart(item: Product) {
    this.dataService.removeFromCart(item);
    this.loadCartItems();
  }
  clearCart() {
    this.dataService.clearCart();
    this.loadCartItems();
  }
  getCharacteristicValue(product: Product, characteristicName: string): string {
    const characteristic = product.characteristics.find(c => c.characteristic === characteristicName);
    return characteristic ? characteristic.value : '';
  }
}