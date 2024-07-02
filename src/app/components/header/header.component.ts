import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchResults: Product[] = [];
  searchTerm: string = '';
  constructor(private dataService: DataService, private router: Router) {}
  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.dataService.searchProducts(this.searchTerm).subscribe((results) => {
      this.searchResults = results;
    });
  }
  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }
}