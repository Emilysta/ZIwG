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
        // console.log('rawResult');
        // console.log(rawResult);

        // rawResult["$values"].forEach(async (event) => {
        //   if (event.mainImage !== '') {
        //     let bytes = new Uint8Array(event.mainImage.length);

        //     for (let i = 0; i < bytes.length; i++) {
        //       bytes[i] = event.mainImage.charCodeAt(i);
        //     }
        //     event.mainImage = new File([bytes], 'image.jpg', {
        //       type: "image/jpg",
        //     })
        //   }
        //})
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
    modifyEvent: build.mutation<null, { eventId: string, data: Omit<EventData, 'organiserName' | 'organiserId' | 'organiserImage' | 'mainImage' | 'id' | 'images'> }>({
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