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
            CreateMap<CreateDTO, Event>();
            CreateMap<Event, CreateDTO>();
            CreateMap<ModifyDTO, Event>();
            CreateMap<Event, ModifyDTO>();
        }
    }
}
