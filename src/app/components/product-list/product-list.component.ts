import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortBy: keyof Product | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  images: { [key: string]: string } = {};
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.loadImages();
    });
  }
  loadImages() {
    this.products.forEach(product => {
      this.dataService.getProductImage(product).subscribe(imageUrl => {
        this.images[product.id] = imageUrl;
      });
    });
  }
  filterAndSortProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredProducts.sort((a, b) => {
      if (!this.sortBy) {
        return 0; // If the sort property is undefined or null, don't sort
      }
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];
      if ((aValue !== null && aValue !== undefined) && (bValue !== null && bValue !== undefined)) {
        if (aValue < bValue) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }
  onSearch() {
    this.filterAndSortProducts();
  }
  onSort(field: keyof Product) {
    this.sortBy = field;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filterAndSortProducts();
  }
  addToCart(product: Product) {
    this.dataService.addToCart(product);
  }
  addToFavorites(product: Product) {
    this.dataService.addToFavorites(product);
  }
}