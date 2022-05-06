import * as React from 'react';
import LeafletMap from 'Components/LeafletMap';
import SimpleEditableInput from './Input/SimpleEditableInput';
import './LocationPicker.scss';
import { Search } from 'react-bootstrap-icons';



export default function LocationPicker() {
    const [currentPoint, setCurrentPoint] = React.useState();
    const [resultsList, setResultsList] = React.useState(undefined);

    function onSearchFieldChange(id: string, value: string) {
        //fetch api action
    }

    return (
        <div className='pickerBox'>
            <h2>Map</h2>
            <div className='locationPickerBox'>
                <div className='searchColumn'>
                    <div className='addressSearchFieldBox'>
                        <SimpleEditableInput id='addressSearchField' onChangeAction={onSearchFieldChange} isClearOnEnter={true} inputClassName='addressSearchField' />
                        <Search />
                    </div>
                    <p>Results</p>
                    {/* {resultsList.map((item, index) => { })} */}
                </div>
                <div className="mapBox">
                    <LeafletMap mapID='locationPickerMap' />
                </div>
            </div>
        </div>
    )
}
