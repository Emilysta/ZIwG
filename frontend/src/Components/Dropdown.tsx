import * as React from 'react';
import { useState } from 'react';
import { useModal } from 'Utils/Hooks';
import ZiwgSkeleton from 'Utils/Skeletons';
import './Dropdown.scss';
import { ChevronDown } from 'react-bootstrap-icons';


type DropdownItem = {
    icon?: any,
    text: string,
}
type DropdownProps = {
    items: DropdownItem[],
    initialState?: boolean,
    initialSelected?: number,
    isLoading?: boolean,
    onSelectionChange?: (selectedIndex: number) => void;
}

export default function Dropdown(props: DropdownProps) {
    const items = props.items;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(items.at(0));
    const [display, , toggleDisplay] = useModal(false);

    function changeSelection(index: number, item: DropdownItem) {
        setSelectedIndex(index);
        setSelectedItem(item);
        toggleDisplay();
        if (props.onSelectionChange) {
            props.onSelectionChange(index);
        }
    }
    if (props.isLoading)
        return (<div className='dropdown'><ZiwgSkeleton /></div >);
    else
        return (
            <div className='dropdown'>
                <div className='textBox' onClick={toggleDisplay}>
                    {selectedItem.icon}
                    {selectedItem.text}
                    <ChevronDown />
                    <div className="dropdownContent" style={{ display: `${display ? 'block' : 'none'}` }}>
                        {items.map((item, id) =>
                            <div className={`option${id === selectedIndex ? ' selected' : ''} `} key={id} onClick={() => changeSelection(id, item)}>
                                {item.icon ? item.icon : ''}
                                <p>{item.text}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
}
