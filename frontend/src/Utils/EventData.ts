export type EventDataSimple = {
    EventId: string,
    EventName: string,
    StartDate: Date,
    EndDate: Date,
    MainImage: string,
    OrganizerName: string,
    OrganizerImage: string,
}

export interface EventData extends EventDataSimple {
    Description: string,
    Tags: string[],
    IsPublicEvent: boolean,
    IsPaidTicket: boolean,
    TicketPrice: string,
    IsTicketLimit: boolean,
    TicketCount: string,
    Images: string[],
    Localization: string,
}