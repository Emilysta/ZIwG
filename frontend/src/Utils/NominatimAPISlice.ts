import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NominatimPlace } from './NominatimPlace';

export const nominatimApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://nominatim.openstreetmap.org/',
    }),
    reducerPath: 'nominatimApi',
    endpoints: (build) => ({
        getLocationBy: build.query<string[], { q: string, format: string }>({
            query: (arg) => ({
                url: 'search',
                params: arg,
            }),
            transformResponse: (rawResult: NominatimPlace) => {
                console.log(rawResult);
                return [rawResult.lat, rawResult.lon];
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