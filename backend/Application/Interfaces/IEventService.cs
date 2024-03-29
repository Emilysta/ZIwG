﻿using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using System;
using System.Collections.Generic;
using Application.DTOs.UserDTOs;
using Domain.Entities;
namespace Application.Interfaces
{
    public interface IEventService
    {
        public Task<Event> AddEvent(CreateEventDTO @event);
        public bool DeleteEvent(int id);
        public Task<ReturnEventExtendedDTO> GetEventById(int id);
        public bool ModifyEvent(ModifyEventDTO @event, int id);
        public Task<List<ReturnEventsAsListDTO>> GetEvents(string location, string monthAndYear, string userId, string organiserId);
        public Task<bool> UploadMainImage(FileUpload fileObj, int eventId);
        public Task<bool> SaveChangesAsync();
    }
}
