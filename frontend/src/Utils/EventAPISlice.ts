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
    addEvent: build.mutation<null, Omit<EventData, 'organizerName' | 'organizerImage' | 'id' | 'mainImage' | 'images'>>({
      query: (body) => ({
        url: 'add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
    // editPost: build.mutation<EventData, Partial<EventData> & Pick<EventData, 'EventId'>>({
    //   query: (body) => ({
    //     url: `${body.EventId}`,
    //     method: 'PATCH',
    //     body,
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: 'Event', id: arg.EventId }],
    // }),
  }),
})
export const { useGetEventsQuery, useGetUserEventsQuery, useGetEventQuery, useAddEventMutation } = eventApi;