using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Application.DTOs.CarpoolDTOs;

namespace Infrastructure.MappingProfiles
{
    public class CarpoolMappingProfile : Profile
    {
        public CarpoolMappingProfile()
        {
            CreateMap<CreateCarpoolDTO, Carpool>();
            CreateMap<Carpool, CreateCarpoolDTO>();
            CreateMap<ModifyCarpoolDTO, Carpool>();
            CreateMap<Carpool, ModifyCarpoolDTO>();
            CreateMap<ReturnCarpoolDTO, Carpool>();
            CreateMap<Carpool, ReturnCarpoolDTO>();
        }
    }
}