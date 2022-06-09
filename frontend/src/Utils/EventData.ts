import { TagType } from "Components/EventPage/TagList";

export type EventDataSimple = {
    id: string,
    name: string,
    startDate: string,
    endDate: string,
    mainImage: File,
    organiserName: string,
    organiserImage: string,
    organiserId: string,
}
export interface EventData extends EventDataSimple {
    description: string,
    tags: TagType[],
    isPublicEvent: boolean,
    isTicketLimit: boolean,
    ticketLimit: number,
    signed: number,
    available: number,
    place: string,
    isInterested: boolean,
}
