import * as React from 'react';
import { ISearchSuggestions } from './SearchField';
import './EventPageSearchSuggestions.scss'

export default class EventPageSearchSuggestions implements ISearchSuggestions {
    protected dictionary: string[];

    constructor(words: string[]) {
        this.dictionary = words
    }

    protected getSuggestions(search: string): React.ReactNode {
        if (!search) return [];

        const reg = new RegExp(search, 'ig')
        const list = this.dictionary.filter((term) => term.match(reg) ? term : undefined);

        return list.map((word, i) => {
            const start: number = word.search(reg)
            const finish: number = start + search.length;
            return <li key={i}>
                {word.substring(0, start)}
                <b>{word.substring(start, finish)}</b>
                {word.substring(finish)}
            </li>;
        })
    }

    public print(search: string) {
        return (
            <ul className='eventPageSearchSuggestions'>
                {search && this.getSuggestions(search)}
            </ul>
        )
    }
}
