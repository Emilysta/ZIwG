import * as React from 'react';
import { useState } from 'react';
import { useModal } from 'Utils/Hooks';
import ZiwgSkeleton from 'Utils/Skeletons';
import './Dropdown.scss';

type DropdownItem = {
    icon?: any,
    text: string,
}
type DropdownProps = {
    items: DropdownItem[],
    initialState?: boolean,
    initialSelected?: number,
    isLoading?: boolean,
}

export default function Dropdown(props: DropdownProps) {
    const items = props.items;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItemText, setSelectedItemText] = useState(items.at(0).text);
    const [display, setDisplay, toggleDisplay] = useModal(false);

    function changeSelection(id: number, text: string) {
        setSelectedIndex(id);
        setSelectedItemText(text);
        toggleDisplay();
    }
    if (props.isLoading)
        return (<div className='dropdown'><ZiwgSkeleton /></div >);
    else
        return (
            <div className='dropdown'>
                <div className='textBox' onClick={toggleDisplay}>
                    {selectedItemText}
                    <div className="dropdownContent" style={{ display: `${display ? 'block' : 'none'}` }}>
                        {items.map((item, id) =>
                            <div className={`option${id === selectedIndex ? ' selected' : ''} `} key={id} onClick={() => changeSelection(id, item.text)}>
                                <p>{item.text}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )
}
