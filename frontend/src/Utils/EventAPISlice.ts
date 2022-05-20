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
      transformResponse: (rawResult: any, meta) => {
        return rawResult['$values'];
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id: EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getUserEvents: build.query<EventDataSimple[], { Location?: string; MonthId?: string, UserId?: string, OrganiserId?: string }>({
      query: (arg) => ({
        url: '',
        params: arg,
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult['$values'];
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id: EventId }) => ({ type: 'Event' as const, EventId })), 'Event']
          : ['Event'],
    }),
    getEvent: build.query<EventData, string>({
      query: (name) => `/${name}`,
      transformResponse: (rawResult: any, meta) => {
        let data: EventData = {
          id: rawResult.id,
          description: rawResult.description,
          name: rawResult.name,
          tags: rawResult.tags['$values'],
          place: rawResult.place,
          startDate: rawResult.startDate,
          endDate: rawResult.endDate,
          isPublicEvent: rawResult.isPublicEvent,
          isPaidTicket: rawResult.isPaidTicket,
          ticketPrice: rawResult.ticketPrice,
          isTicketLimit: rawResult.isTicketLimit,
          ticketLimit: rawResult.ticketLimit,
          mainImage: rawResult.mainImage,
          organiserName: rawResult.organiserName,
          organiserId: rawResult.organiserId,
          organiserImage: rawResult.organiserImage,
        };

        return data;
      },
    }),
    addEvent: build.mutation<string, Omit<EventData, 'organiserName' | 'organiserImage' | 'organiserId' | 'id' | 'mainImage'>>({
      query: (body) => ({
        url: 'add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
    addEventMainImage: build.mutation<null, { eventId: string; image: FormData }>({
      query: (args) => ({
        url: `mainImage/${args.eventId}`,
        method: 'POST',
        body: args.image,
      }),
      invalidatesTags: ['Event'],
    }),
    modifyEvent: build.mutation<null, { eventId: string, data: EventData }>({
      query: (body) => ({
        url: `/${body.eventId}`,
        method: 'PATCH',
        body: {
          name: body.data.name,
          description: body.data.description,
          tags: body.data.tags,
          place: body.data.place,
          startDate: body.data.startDate,
          endDate: body.data.endDate,
          isPublicEvent: body.data.isPublicEvent,
          isPaidTicket: body.data.isPaidTicket,
          ticketPrice: body.data.ticketPrice,
          isTicketLimit: body.data.isTicketLimit,
          ticketLimit: body.data.ticketLimit,
        },
      }),
      invalidatesTags: ['Event'],
    }),
  }),
})
export const { useGetEventsQuery, useGetUserEventsQuery, useGetEventQuery, useAddEventMutation, useAddEventMainImageMutation, useModifyEventMutation } = eventApi;