import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventData, EventDataSimple } from './EventData';

export const myApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ziwg.toadres.pl/api/',
  }),
  tagTypes: ['Event', 'User'],
  endpoints: (build) => ({
    getEvents: build.query<EventDataSimple[], void>({
      query: () => 'Event',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getUserEvents: build.query<EventDataSimple[], { Location: string; MonthId: string, UserId: string }>({
      query: (arg) => ({
        url: 'Event',
        params: arg,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getEvent: build.query<EventData, string>({
      query: (name) => `Event/${name}`,
    }),
    addEvent: build.mutation<EventData, Omit<EventData, 'EventId'>>({
      query: (body) => ({
        url: 'Event/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
    editPost: build.mutation<EventData, Partial<EventData> & Pick<EventData, 'EventId'>>({
      query: (body) => ({
        url: `Event/${body.EventId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Event', id: arg.EventId }],
    }),
  }),
})
export const { useGetEventsQuery, useGetUserEventsQuery, useGetEventQuery, useAddEventMutation, useEditPostMutation } = myApi;