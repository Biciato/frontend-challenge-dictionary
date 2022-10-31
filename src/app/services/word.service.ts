import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WordMeaning } from '../models/WordMeaning';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  selectedWord = ''
  wordMeaning!: WordMeaning;
  fetchError = false
  wordHistory: string[] = []
  baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en'
  constructor(private http: HttpClient) { }

  private getWordMeaningFromAPI(word: string) {
    this.http.get<WordMeaning[]>(`${this.baseURL}/${word}`)
      .subscribe({
        next: (response: WordMeaning[]) => {
          this.wordMeaning = response[0]
          this.fetchError = false
        }, 
        error: error => {
          if (error.error.title === 'No Definitions Found') {
            this.fetchError = true
          }
        }
      })
  }

  getSelectedWord(): string {
    return this.selectedWord
  }

  getWordHistory(): string[] {
    return this.wordHistory
  }

  setSelectedWord(word: string): void {
    this.selectedWord = word
    this.wordHistory.push(word)
    this.getWordMeaningFromAPI(word)
  }
 }
