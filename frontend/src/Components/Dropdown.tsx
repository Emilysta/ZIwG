import * as React from 'react';
import './Dropdown.scss';

export default function Dropdown() {
    return (
        <div className='dropdown'>
            <input type='text' className='textBox' placeholder='Dropdown' readOnly />
            <div className="content">
                <div className='option'><p>Link 1</p></div>
                <div className='option'><p>Link 2</p></div>
            </div>
        </div>
    )
}
