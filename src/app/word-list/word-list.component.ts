import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { WordList } from '../models/WordList';
import { WordHistoryService } from '../services/word-history.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {
  fullList: string[] = []
  showList: string[] = []
  private itemDoc: AngularFirestoreDocument<WordList>;
  constructor(
    public auth: AngularFireAuth, 
    private afs: AngularFirestore, 
    private wordService: WordService,
    private wordHistoryService: WordHistoryService
    ) {
    this.itemDoc = afs.doc<WordList>('EnglishWords/TPLlxNVwtp1GI2DPTrdK');
  }

  ngOnInit(): void {
    this.itemDoc.valueChanges().subscribe(item => {
      this.fullList = item ? item.list.trim().split('\n') : []
      if (this.fullList.length > 0) {
        this.showList = this.fullList.slice(0, 18)
      }
    })
  }

  onScrollDown(): void {
    const newList = this.fullList.slice(this.showList.length, this.showList.length + 18)
    this.showList = [...this.showList, ...newList]
  }

  onWordSelect(word: string): void {
    this.wordService.setSelectedWord(word)
    this.wordHistoryService.addToHistory(word)
  }

}
