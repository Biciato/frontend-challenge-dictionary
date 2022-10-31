export interface Definition {
    definition: string
}

export interface Meaning {
    partOfSpeech: string
    definitions: Definition[]
}

export interface WordMeaning {
    word: string
    phonetic: string
    meanings: Meaning[]
}