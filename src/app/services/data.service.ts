import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:1452/api/products';
  private imageUrl = 'http://localhost:1452/image';
  private cartItems: Product[] = [];
  private favoriteProducts: Product[] = [];
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getProductImage(product: Product): Observable<string> {
    const imageUrl = `http://localhost:1452/image/${product.images[0]}`;
    return this.http.get(imageUrl, { responseType: 'text' });
  }
  addToCart(product: Product) {
    this.cartItems.push(product);
  }
  getCartItems(): Product[] {
    return this.cartItems;
  }
  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }
  clearCart() {
    this.cartItems = [];
  }
  addToFavorites(product: Product) {
    this.favoriteProducts.push(product);
  }
  getFavoriteProducts(): Product[] {
    return this.favoriteProducts;
  }
  removeFromFavorites(product: Product) {
    this.favoriteProducts = this.favoriteProducts.filter(item => item.id !== product.id);
  }
  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products) => {
        if (searchTerm.length >= 3) {
          return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).slice(0, 10);
        } else {
          return [];
        }
      })
    );
  }
}