import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteProducts: Product[] = [];
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.getFavoriteProducts();
  }
  getFavoriteProducts() {
    this.favoriteProducts = this.dataService.getFavoriteProducts();
  }
  removeFromFavorites(product: Product) {
    this.dataService.removeFromFavorites(product);
    this.getFavoriteProducts();
  }
}