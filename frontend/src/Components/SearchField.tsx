import * as React from 'react';
import { Search, X } from 'react-bootstrap-icons';
import './SearchField.scss'

type SearchResult = (value: string, filter: (value: string) => boolean) => void

type SearchFieldProps = {
    dictionary: string[],
    className?: string,
    maxSuggestions?: number,
    onChosen?: SearchResult
};

class SearchSuggestionsState {
    suggestions: string[]
    regex: RegExp

    get first(): string { return this.suggestions[0] }

    constructor(props: SearchFieldProps, search: string) {
        let filter = this.createNewFilter(search)
        this.suggestions = props.dictionary.filter(filter)

        if (props.maxSuggestions)
            this.suggestions = this.suggestions.filter((_, i) => i < props.maxSuggestions)
    }

    createNewFilter(word: string): (value: string) => boolean {
        this.regex = new RegExp(word, 'ig')
        return this.getFilter()
    }

    getFilter(): (value: string) => boolean {
        return this.regex
            ? (value) => value.match(this.regex) != null
            : (_) => true
    }
}

export function SearchField(props: SearchFieldProps) {
    const [search, setSearch]: [string, any] = React.useState('')
    const [suggestions, setSuggestions]: [SearchSuggestionsState, any] = React.useState(new SearchSuggestionsState(props, search))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onChosen()
    const handleClear = () => setSearch('');

    const onChosen = () => {
        if (props.onChosen)
            props.onChosen(search, suggestions.getFilter());
    }

    React.useEffect(() => setSuggestions(new SearchSuggestionsState(props, search)), [search])
    React.useEffect(() => onChosen(), [suggestions])

    const expandStyle: React.CSSProperties = { display: search ? 'block' : 'none' }

    return (
        <span className={`searchField ${props.className}`}>
            <input type="text" placeholder='Search' value={search} onChange={handleChange} onKeyUp={handleKeyUp} />
            {search ? <X onClick={handleClear} /> : <Search />}
            {
                <div className='expandable' style={expandStyle}>
                    <ul className='eventPageSearchSuggestions'>
                        {suggestions.suggestions.map((word, i) => {
                            const start: number = word.search(suggestions.regex)
                            const finish: number = start + search.length;
                            return <li key={i} onClick={(e) => {
                                props.onChosen && props.onChosen(word, suggestions.createNewFilter(word))
                                setSearch(word);
                            }}>
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
