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
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getUserEvents: build.query<EventDataSimple[], { Location: string; MonthId: string, UserId: string }>({
      query: (arg) => ({
        url: '',
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
    addEvent: build.mutation<null, Omit<EventData, 'OrganizerName' | 'OrganizerImage' | 'EventId'>>({
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