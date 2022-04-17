import * as React from 'react';
import { ISearchSuggestions } from './SearchField';
import './EventPageSearchSuggestions.scss'

const levenshteinDistance = (first: string, second: string): number => {
    const n: number = first.length
    const m: number = second.length
    const d: number[][] = Array(m).fill(null).map(() => Array(n).fill(0));

    for (let i: number = 1; i < m; i++) {
        for (let j: number = 1; j < n; j++) {
            let cost: number = first[i] === second[j] ? 0 : 1
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + cost
            )
        }
    }

    return d[m - 1][n - 1]
}

const levenshteinDistanceOpt = (first: string, second: string, strictness: number): number => {
    const n: number = first.length
    const m: number = second.length

    if (Math.abs(n - m) > strictness)
        return Infinity

    const d: number[][] = Array(m).fill(null).map(() => Array(n).fill(0));

    for (let i: number = 1; i < m; i++) {
        for (let j: number = 1; j < n; j++) {
            let cost: number = first[i] === second[j] ? 0 : 1
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + cost
            )

            if (d[i][j] > strictness)
                return Infinity
        }
    }

    return d[m - 1][n - 1]
}

export default class EventPageSearchSuggestions implements ISearchSuggestions {
    words: string[];

    constructor(words: string[]) {
        this.words = words
    }

    print(search: string) {
        const getList = () => this.words.map((e, i) => <li key={i}>{e}<b>({levenshteinDistanceOpt(e, search, 5)})</b></li>);
        return (
            <ul className='eventPageSearchSuggestions'>
                {search && getList()}
            </ul>
        )
    }
}