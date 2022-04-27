export type EventData = {
    EventId: string,
    EventName: string,
    Description: string,
    StartDate: Date,
    EndDate: Date,
    Tags: string[],
    IsPublicEvent: boolean,
    IsPaidTicket: boolean,
    TicketPrice: string,
    IsTicketLimit: boolean,
    TicketCount: string,
    Images: string[],
    MainImage: string,
    OrganizatorId: string,
}

export type EventDataSimple = {
    EventId: string,
    EventName: string,
    StartDate: Date,
    EndDate: Date,
    MainImage: string,
    OrganizatorName: string,
    OrganizatorImage: string,
}