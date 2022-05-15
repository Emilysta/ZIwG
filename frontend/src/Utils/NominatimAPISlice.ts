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
                return rawResult.display_name;
            },
        }),
    }),
})

export const { useGetLocationByQuery, useGetLocationByLatLonQuery } = nominatimApi;
