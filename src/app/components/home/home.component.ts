import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  activeFilter: string = 'new-arrival';
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.getFeaturedProducts();
    this.getAllProducts();
    this.filterProducts();
  }
  getFeaturedProducts() {
    this.dataService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
    });
  }
  getAllProducts() {
    this.dataService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.filterProducts();
    });
  }
  filterProducts() {
    this.filteredProducts = this.getFilteredProducts();
  }
  getFilteredProducts(): Product[] {
    switch (this.activeFilter) {
      case 'new-arrival':
        return this.allProducts.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'bestseller':
        return this.allProducts.slice().sort((a, b) => b.rating - a.rating);
      case 'featured':
        return this.featuredProducts;
      default:
        return this.allProducts;
    }
  }
  setActiveFilter(filter: string) {
    this.activeFilter = filter;
    this.filterProducts();
  }
  trackByFn(index: number, product: Product) {
    return product.id;
  }
  addToCart(product: Product) {
    this.dataService.addToCart(product);
  }
  addToFavorites(product: Product) {
    this.dataService.addToFavorites(product);
  }
}