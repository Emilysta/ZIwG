using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Application.DTOs.EventDTOs;

namespace Infrastructure.MappingProfiles
{
    public class EventMappingProfile: Profile
    {
        public EventMappingProfile()
        {
            CreateMap<CreateEventDTO, Event>();
            CreateMap<ModifyEventDTO, Event>();
            CreateMap<Event, ReturnEventsAsListDTO>()
                .ForMember(dest => dest.OrganiserName,
                opt => opt.MapFrom(src => src.Organiser.DisplayName))
                .ForMember(dest => dest.OrganiserImage,
                opt => opt.MapFrom(src => src.Organiser.Photo));
            CreateMap<Event, ReturnEventExtendedDTO>()
                .ForMember(dest => dest.OrganiserName,
                opt => opt.MapFrom(src => src.Organiser.DisplayName))
                .ForMember(dest => dest.OrganiserImage,
                opt => opt.MapFrom(src => src.Organiser.Photo));
        }
    }
}
