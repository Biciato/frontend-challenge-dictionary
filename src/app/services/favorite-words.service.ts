import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FavoriteWords } from '../models/FavoriteWords';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteWordsService {
    userId!: string | undefined
    favoriteWords$!: Observable<FavoriteWords | undefined> 
    favoriteWords = ['']
    favoriteWordsCollection: AngularFirestoreCollection<FavoriteWords>
    favoriteWordsDoc!: AngularFirestoreDocument<FavoriteWords>
    constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
        this.favoriteWordsCollection = afs.collection<FavoriteWords>('FavoriteWords')
        auth.currentUser.then(el => this.fetchCollections(el?.uid))
    }

    private fetchCollections(uid: string | undefined) {
        if (uid) {
            this.userId = uid
            this.afs.collection<FavoriteWords>('FavoriteWords', ref => ref.where('userId', '==', uid))
                .snapshotChanges()
                .pipe(
                    map(actions => actions.map(a => {
                        const data = a.payload.doc.data() as FavoriteWords;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    }))
                ).subscribe(collections => {
                    const docId = collections[0].id
                    if (collections.length > 0) {
                        this.favoriteWordsDoc = this.afs.doc<FavoriteWords>(`FavoriteWords/${docId}`)
                        this.favoriteWords$ = this.favoriteWordsDoc.valueChanges()
                        this.favoriteWords$.subscribe(obj => {
                            if (obj) {
                                this.favoriteWords = obj.list
                            }
                        })
                    }
                })
        }
    }

    handleFavoriteClick(word: string) {
        if (this.favoriteWordsDoc) {
            this.updateFavoriteWords(word)
        } else {
            this.createFavoriteWords(word)
        }
    }

    createFavoriteWords(word: string) {
        if (this.userId) {
            this.favoriteWordsCollection.add({list: [word], userId: this.userId})
        }
    }

    updateFavoriteWords(word: string) {
        const isInList = this.favoriteWords.some(element => element === word)
        let list;
        if (isInList) {
            list = this.favoriteWords.filter(element => element !== word)
        } else {
            list = [...this.favoriteWords, word]
        }
        this.favoriteWordsDoc.update({
            list 
        })
    }
}
