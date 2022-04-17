import * as React from 'react';
import { Search } from 'react-bootstrap-icons';
import './SearchField.scss'

export function SearchField(props: any) {
    // todo search field
    return (
        <span className='searchField'>
            <input type="text" placeholder='Search' />
            <Search />
        </span>
    );
}
