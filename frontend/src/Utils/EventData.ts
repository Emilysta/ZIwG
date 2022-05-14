export type EventDataSimple = {
    id: string,
    name: string,
    startDate: string,
    endDate: string,
    mainImage: string,
    organizerName: string,
    organizerImage: string,
}

export interface EventData extends EventDataSimple {
    description: string,
    tags: string[],
    isPublicEvent: boolean,
    isPaidTicket: boolean,
    ticketPrice: number,
    isTicketLimit: boolean,
    ticketLimit: number,
    place: string,
}