import { Component } from '@angular/core';
import { WordHistoryService } from '../services/word-history.service';

@Component({
  selector: 'app-word-history',
  templateUrl: './word-history.component.html',
  styleUrls: ['./word-history.component.scss']
})
export class WordHistoryComponent {

  constructor(public wordHistoryService: WordHistoryService) { }

}
