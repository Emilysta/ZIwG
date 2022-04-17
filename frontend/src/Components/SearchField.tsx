import * as React from 'react';
import { Search } from 'react-bootstrap-icons';
import './SearchField.scss'

export interface ISearchSuggestions {
    print(search: string): React.ReactNode
}

export const mockSuggestionsLogic: ISearchSuggestions = {
    print: (search: string) => [...new Array(5)].map(() => (<>{search} <br /></>))
}

type SearchFieldProps = {
    className?: string,
    suggestions?: ISearchSuggestions
};

export function SearchField(props: SearchFieldProps) {
    const [expanded, setExpanded]: [boolean, any] = React.useState(false)
    const [search, setSearch]: [string, any] = React.useState(null)

    const expandStyle: React.CSSProperties = {
        display: expanded ? 'block' : 'none'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)

    React.useEffect(() => setExpanded(search && search.length > 0), [search])

    return (
        <span className={`searchField ${props.className}`}>
            <input type="text" placeholder='Search' defaultValue={search} onChange={handleChange} />
            <Search />
            {
                props.suggestions &&
                <div className='expandable' style={expandStyle}>
                    {props.suggestions.print(search)}
                </div>
            }
        </span>
    );
}
