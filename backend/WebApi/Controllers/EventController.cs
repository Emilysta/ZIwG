using System.Threading.Tasks;
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
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (_eventService.DeleteEvent(id))
                if (await _eventService.SaveChangesAsync())
                    return NoContent();
            return NotFound();
        }

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

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetEvents(string Location = null, string MonthId= null, string UserId= null)
        {
            var events = await _eventService.GetEvents(Location, MonthId, UserId);
            return Ok(events);
        }
    }
}
