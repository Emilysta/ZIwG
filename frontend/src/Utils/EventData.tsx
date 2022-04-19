export type EventData = {
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
}