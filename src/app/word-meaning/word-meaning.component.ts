import { Component } from '@angular/core';
import { FavoriteWordsService } from '../services/favorite-words.service';
import { WordHistoryService } from '../services/word-history.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word-meaning',
  templateUrl: './word-meaning.component.html',
  styleUrls: ['./word-meaning.component.scss']
})
export class WordMeaningComponent {

  constructor(
    public wordService: WordService, 
    public favoriteWordsService: FavoriteWordsService,
    public wordHistoryService: WordHistoryService
    ) {
  
  }

  onFavoriteClick(word: string) {
    this.favoriteWordsService.handleFavoriteClick(word)
    this.wordHistoryService.addToHistory(word)
  }

}
