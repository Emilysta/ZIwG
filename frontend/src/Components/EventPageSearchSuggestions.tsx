import * as React from 'react';
import { ISearchSuggestions } from './SearchField';
import './EventPageSearchSuggestions.scss'

export default class EventPageSearchSuggestions implements ISearchSuggestions {
    protected dictionary: string[];
    protected currentList: string[]
    protected maxNumber: number = 6;
    protected onChosen: (search: string) => void;

    public get suggestions() {
        return this.currentList
    }

    public get first() {
        return this.suggestions[0]
    }

    constructor(words: string[], onChosen: (search: string) => void) {
        this.dictionary = words
        this.onChosen = onChosen
    }

    protected getSuggestions(search: string): React.ReactNode {
        if (!search) return [];

        const reg = new RegExp(search, 'ig')
        this.currentList = this.dictionary.filter((term) => term.match(reg) ? term : undefined).filter((v, i) => i < this.maxNumber);

        return this.currentList.map((word, i) => {
            const start: number = word.search(reg)
            const finish: number = start + search.length;
            return <li key={i} onClick={(e) => this.onChosen && this.onChosen(word)}>
                {word.substring(0, start)}
                <b>{word.substring(start, finish)}</b>
                {word.substring(finish)}
            </li>;
        })
    }

    public chooseFirst() {
        this.onChosen(this.first)
    }

    public print(search: string) {
        return (
            <ul className='eventPageSearchSuggestions'>
                {search && this.getSuggestions(search)}
            </ul>
        )
    }
}
