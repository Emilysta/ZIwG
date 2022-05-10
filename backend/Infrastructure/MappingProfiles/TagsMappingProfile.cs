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
    public class TagMappingProfile : Profile
    {
        public TagMappingProfile()
        {
            CreateMap<TagDTO, Tag>();
            CreateMap<Tag, TagDTO>();
        }
    }
}
