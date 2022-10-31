import { Component } from '@angular/core';
import { FavoriteWordsService } from '../services/favorite-words.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent {
  constructor(public favoriteWordsService: FavoriteWordsService) {
    
  }
}
