import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }
  ngOnInit() {
    this.getProductDetails();
  }
  getProductDetails() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.dataService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    }
  }
  addToCart() {
    if (this.product) {
      this.dataService.addToCart(this.product);
    }
  }
  addToFavorites() {
    if (this.product) {
      this.dataService.addToFavorites(this.product);
    }
  }
}