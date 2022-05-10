import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NominatimPlace, ShortNominatimPlace } from './NominatimPlace';
import { } from 'redux-thunk';

export const nominatimApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://nominatim.openstreetmap.org/',
    }),
    reducerPath: 'nominatimApi',
    endpoints: (build) => ({
        getLocationBy: build.query<ShortNominatimPlace[], { q: string, format: string }>({
            query: (arg) => ({
                url: 'search',
                params: arg,
            }),
            transformResponse: (rawResult: NominatimPlace[]) => {
                return rawResult.map((value: NominatimPlace): ShortNominatimPlace => {
                    return { lat: value.lat, lon: value.lon, display_name: value.display_name, boundingbox: value.boundingbox };
                });
            },
        }),

        getLocationByLatLon: build.query<string, { lat: string, lon: string, format: string }>({
            query: (arg) => ({
                url: 'reverse',
                params: arg,
            }),
            transformResponse: (rawResult: NominatimPlace) => {
                console.log(rawResult);
                return rawResult.display_name;
            },
        }),
    }),
})

export const { useGetLocationByQuery, useGetLocationByLatLonQuery } = nominatimApi;

// export interface ShortNominatimPlace {
//     boundingbox?: string[],
//     lat: string,
//     lon: string,
//     display_name: string,
// }

export const changeSeed = seed => ({
    type: "CHANGE_SEED",
    seed
});

const contactsFetched = contacts => ({ // (4)
    type: "FETCH_CONTACTS_SUCCESS",
    contacts
});

export const fetchContacts = () => (dispatch, getState) => { // (11)
    fetch(
        "https://randomuser.me/api/?format=json&results=10&seed=" +
        encodeURIComponent(getState().seed)
    )
        .then(res => res.json())
        .then(json => dispatch(contactsFetched(json.results)));
};

export const changeSeedAndFetch = seed => dispatch => {
    dispatch(changeSeed(seed)); // (12)
    dispatch(fetchContacts()); // (13)
};