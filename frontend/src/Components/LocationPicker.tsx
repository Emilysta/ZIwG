import * as React from 'react';
import LeafletMap from 'Components/LeafletMap';
import SimpleEditableInput from './Input/SimpleEditableInput';
import './LocationPicker.scss';
import { Search } from 'react-bootstrap-icons';
import { nominatimApi, useGetLocationByQuery } from 'Utils/NominatimAPISlice';
import { useAppDispatch } from 'Utils/Store';
import { NominatimPlace, ShortNominatimPlace } from 'Utils/NominatimPlace';



export default function LocationPicker() {
    const [currentPoint, setCurrentPoint] = React.useState();
    const [resultsList, setResultsList] = React.useState<ShortNominatimPlace[]>(undefined);
    const dispatch = useAppDispatch();
    let timeout: NodeJS.Timeout = null;


    function onSearchFieldChange(id: string, value: string) {
        if (timeout != null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {        //fetch api action
            const result = dispatch(nominatimApi.endpoints.getLocationBy.initiate({ q: value, format: "json" })).unwrap();
            // result.then((response) => {
            //     return response.json();
            // }).then((data: NominatimPlace[]) => {
            //     console.log("fetched" + data);
            // });
        }, 2000);
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
                    {/* {resultsList && resultsList.map((item, index) => { <p>{item.display_name}</p> })} */}
                </div>
                <div className="mapBox">
                    <LeafletMap mapID='locationPickerMap' />
                </div>
            </div>
        </div>
    )
}
