﻿using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.EventDTOs;
using Application.Interfaces;
using System;
using System.Collections.Generic;

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
        /// <summary>
        /// Add event, organiserID is taken from logged user, no need to send it in body
        /// </summary>
        /// <param name="event"></param> 
        /// <response code="204">Success, event added</response>
        /// <response code="400">Something went wrong</response>
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
        /// <summary>
        /// Delete event 
        /// </summary>
        /// <param name="id"></param> 
        /// <response code="204">Success, event deleted</response>
        /// <response code="400">Something went wrong</response>
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (_eventService.DeleteEvent(id))
                if (await _eventService.SaveChangesAsync())
                    return NoContent();
            return NotFound();
        }
        /// <summary>
        /// Modify event 
        /// </summary>
        /// <param name="event"></param>
        /// <param name="id"></param> 
        /// <response code="200">Success, event modified</response>
        /// <response code="400">Something went wrong</response>
        [HttpPatch]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Put([FromBody] ModifyDTO @event, [FromRoute] int id)
        {
            if (@event == null)
                return BadRequest();

            if (_eventService.ModifyEvent(@event, id))
                if (await _eventService.SaveChangesAsync())
                    return Ok();

            return BadRequest();
        }
        /// <summary>
        /// Get events, can specify Location, number of month by order and user 
        /// </summary>
        /// <param name="Location"></param>
        /// <param name="MonthId"></param> 
        /// <param name="UserId"></param> 
        /// <response code="200">Success, events returned</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetEvents(string Location = null, string MonthId= null, string UserId= null)
        {
            var events = await _eventService.GetEvents(Location, MonthId, UserId);
            return Ok(events);
        }
    }
}
