import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordHistory } from '../models/WordHistory';

@Injectable({
  providedIn: 'root'
})
export class WordHistoryService {
    userId!: string | undefined
    wordHistory$!: Observable<WordHistory | undefined> 
    wordHistory = ['']
    wordHistoryCollection: AngularFirestoreCollection<WordHistory>
    wordHistoryDoc!: AngularFirestoreDocument<WordHistory>
    constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
        this.wordHistoryCollection = afs.collection<WordHistory>('WordHistory')
        auth.currentUser.then(el => this.fetchCollections(el?.uid))
    }

    private fetchCollections(uid: string | undefined) {
        if (uid) {
            this.userId = uid
            this.afs.collection<WordHistory>('WordHistory', ref => ref.where('userId', '==', uid))
                .snapshotChanges()
                .pipe(
                    map(actions => actions.map(a => {
                        const data = a.payload.doc.data() as WordHistory;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }))
                ).subscribe(collections => {
                    if (collections.length > 0) {
                        const docId = collections[0].id
                        this.wordHistoryDoc = this.afs.doc<WordHistory>(`WordHistory/${docId}`)
                        this.wordHistory$ = this.wordHistoryDoc.valueChanges()
                        this.wordHistory$.subscribe(obj => {
                            if (obj) {
                                this.wordHistory = obj.history
                            }
                        })
                    }
                })
        }
    }

    addToHistory(word: string) {
        if (this.wordHistoryDoc) {
            this.wordHistoryDoc.update({
                history: [...this.wordHistory, word] 
            })
        } 
        if (this.userId && !this.wordHistoryDoc) {
            this.wordHistoryCollection.add({
                userId: this.userId,
                history: [word]
            })
        }
    }
}
