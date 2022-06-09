using System.IO;
using Domain.Entities;
using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;


public class InvoiceDocument : IDocument
{
    public TicketDTO Model { get; }

    public InvoiceDocument(TicketDTO model)
    {
        Model = model;
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.Background("#F5DFAC");
                page.Margin(40);
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);

                    
                page.Footer().AlignCenter().Text(x =>
                {
                    x.CurrentPageNumber();
                    x.Span(" / ");
                    x.TotalPages();
                });
            });
    }

    void ComposeHeader(IContainer container)
    {
        var titleStyle = TextStyle.Default.FontSize(20).SemiBold().FontColor("#653E00");

        container.PaddingBottom(10).Row(row =>
        {
            row.RelativeItem().Column(column =>
            {
                column.Item().Text(Model.EventName).Style(titleStyle);

                column.Item().Text(text =>
                {
                    text.Span("Date: ").SemiBold();
                    if(Model.StartDate != Model.EndDate) { 
                        text.Span($"{Model.StartDate:d} - {Model.EndDate:d}"); 
                    }
                    else
                    {
                        text.Span($"{Model.StartDate:d}");
                    }
                    
                });
            });

            byte[] imageData = File.ReadAllBytes(@"C:\Users\kacpe\source\repos\projektZIWG\backend\Domain\Images\eventCollabLogo.png");
            row.ConstantItem(140).Height(50).Image(imageData);
        });
    }

    void ComposeContent(IContainer container)
    {
        container.Column(column =>
        {
            column.Spacing(2);
            column.Item().Row(row =>
            {
                row.RelativeColumn().Column(column =>
                {
                    column.Item().BorderBottom(1).PaddingBottom(5).Text("Personal ticket").SemiBold();

                    column.Item().Row(row =>
                    {
                        row.RelativeColumn().Column(column =>
                        {
                            column.Item().Text("First name: ");
                            column.Item().Text("Last name: ");
                            column.Item().Text("Date of birth: ");
                        });
                        row.ConstantItem(10);
                        row.RelativeColumn().Column(column =>
                        {
                            column.Item().Text(Model.FirstName);
                            column.Item().Text(Model.LastName);
                            column.Item().Text($"{Model.DateOfBirth:d}");
                        });
                    });
                });
                row.ConstantItem(50);
                row.RelativeColumn().Column(column =>
                {
                    column.Item().BorderBottom(1).PaddingBottom(5).Text("Event").SemiBold();

                    column.Item().Row(row =>
                    {
                        row.RelativeColumn().Column(column =>
                        {
                            column.Item().Text("Start date: ");
                            column.Item().Text("End date: ");
                            column.Item().Text("Place: ");
                            if (Model.IsPaidTicket == true && Model.TicketPrice != 0)
                            {
                                column.Item().Text("Prce: ");
                            }
                            else
                            {
                                column.Item().Text("Free entrance");
                            }
                        });
                        row.ConstantItem(10);
                        row.RelativeColumn().Column(column =>
                        {
                            column.Item().Text(Model.StartDate);
                            column.Item().Text(Model.EndDate);
                            column.Item().Text(Model.Place);
                            if (Model.IsPaidTicket == true && Model.TicketPrice != 0)
                            {
                                column.Item().Text(Model.TicketPrice);
                            }
                        });
                    });
                });
                column.Item().BorderBottom(1).PaddingBottom(5).Text("Organiser").SemiBold();

                column.Item().Row(row =>
                {
                    row.RelativeColumn().Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeColumn().Column(column =>
                            {
                                column.Item().Text("Organiser: ");
                            });
                            row.ConstantItem(10);
                            row.RelativeColumn().Column(column =>
                            {
                                column.Item().Text(Model.OrganiserName);
                            });
                        });
                    });
                    row.ConstantItem(50);
                    row.RelativeColumn().Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeColumn().Column(column =>
                            {
                                column.Item().Text("Contact email: ");
                            });
                            row.ConstantItem(10);
                            row.RelativeColumn().Column(column =>
                            {
                                column.Item().Text(Model.OrganiserEmail);
                            });
                        });
                    });
                });
            });
        });


        
    }
}