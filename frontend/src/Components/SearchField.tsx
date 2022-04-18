import * as React from 'react';
import { Search } from 'react-bootstrap-icons';
import './SearchField.scss'

type SearchFieldProps = {
    dictionary: string[],
    className?: string,
    maxSuggestions?: number,
    onChosen?: (value: string) => any
};

class SearchSuggestionsState {
    suggestions: string[]
    regex: RegExp

    get first(): string { return this.suggestions[0] }

    constructor(props: SearchFieldProps, search: string) {
        this.regex = new RegExp(search, 'ig')
        this.suggestions = props.dictionary.filter((e) => e.match(this.regex))

        if (props.maxSuggestions)
            this.suggestions = this.suggestions.filter((_, i) => i < props.maxSuggestions)
    }
}

export function SearchField(props: SearchFieldProps) {
    const [search, setSearch]: [string, any] = React.useState(null)
    const [suggestions, setSuggestions]: [SearchSuggestionsState, any] = React.useState(new SearchSuggestionsState(props, search))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (props.onChosen && e.key === 'Enter') props.onChosen(suggestions.first)
    }

    React.useEffect(() => setSuggestions(new SearchSuggestionsState(props, search)), [search])

    const expandStyle: React.CSSProperties = { display: search ? 'block' : 'none' }

    return (
        <span className={`searchField ${props.className}`}>
            <input type="text" placeholder='Search' defaultValue={search} onChange={handleChange} onKeyUp={handleKeyUp} />
            <Search />
            {
                <div className='expandable' style={expandStyle}>
                    <ul className='eventPageSearchSuggestions'>
                        {suggestions.suggestions.map((word, i) => {
                            const start: number = word.search(suggestions.regex)
                            const finish: number = start + search.length;
                            return <li key={i} onClick={(e) => props.onChosen && props.onChosen(word)}>
                                {word.substring(0, start)}
                                <b>{word.substring(start, finish)}</b>
                                {word.substring(finish)}
                            </li>;
                        })}
                    </ul>
                </div>
            }
        </span>
    );
}
