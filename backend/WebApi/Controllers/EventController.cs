﻿using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.EventDTOs;
using Application.Interfaces;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Post([FromBody] CreateDTO @event)
        {
            if (@event == null)
            {
                return BadRequest();
            }
            if (await _eventService.AddEvent(@event))
                if (await _eventService.SaveChangesAsync())
                {
                    return NoContent();
                }
            return BadRequest();
        }
    }
}
