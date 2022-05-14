import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventData, EventDataSimple } from './EventData';

export const eventApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/Event/',
  }),
  reducerPath: 'eventApi',
  tagTypes: ['Event'],
  endpoints: (build) => ({
    getEvents: build.query<EventDataSimple[], void>({
      query: () => '',
      transformResponse: (rawResult: EventDataSimple[], meta) => {
        console.log(rawResult);
        return rawResult['$values'];
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id: EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getUserEvents: build.query<EventDataSimple[], { Location: string; MonthId: string, UserId: string }>({
      query: (arg) => ({
        url: '',
        params: arg,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id: EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getEvent: build.query<EventData, string>({
      query: (name) => `/${name}`,
    }),
    addEvent: build.mutation<null, Omit<EventData, 'organiserName' | 'organiserImage' | 'id' | 'mainImage'>>({
      query: (body) => ({
        url: 'add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
    addEventMainImage: build.mutation<null, { eventId: string; image: string }>({
      query: (body) => ({
        url: `mainImage/${body.eventId}`,
        method: 'POST',
        body: body.image,
      }),
      invalidatesTags: ['Event'],
    }),
    modifyEvent: build.mutation<null, { eventId: string, data: Omit<EventData, 'organiserName' | 'organiserImage' | 'mainImage' | 'id'> }>({
      query: (body) => ({
        url: `/${body.eventId}`,
        method: 'PATCH',
        body: body.data,
      }),
      invalidatesTags: ['Event'],
    }),
  }),
})
export const { useGetEventsQuery, useGetUserEventsQuery, useGetEventQuery, useAddEventMutation, useAddEventMainImageMutation, useModifyEventMutation } = eventApi;