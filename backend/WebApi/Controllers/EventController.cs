using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.EventDTOs;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using Application.DTOs.UserDTOs;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IEventUsersService _eventUserService;

        public EventController(IEventService eventService, IEventUsersService eventUsersService)
        {
            _eventService = eventService;
            _eventUserService = eventUsersService;
        }
        /// <summary>
        /// Add event main image
        /// </summary>
        /// <param name="fileObj"></param> 
        /// /// <param name="id"></param> 
        /// <response code="200">Success, photo added</response>
        /// <response code="400">Something went wrong</response>
        [HttpPost]
        [Route("mainImage/{id}")]
        public async Task<IActionResult> UploadMainImage([FromForm] FileUpload fileObj, [FromRoute] int id)
        {
            if (await _eventService.UploadMainImage(fileObj, id))
            {
                return Ok();
            }
            return BadRequest();
        }
        /// <summary>
        /// Add event, organiserID is taken from logged user, no need to send it in body
        /// </summary>
        /// <param name="event"></param> 
        /// <response code="204">Success, event added</response>
        /// <response code="400">Something went wrong</response>
        /// <response code="403">Access forbidden</response>
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Post([FromBody] CreateEventDTO @event)
        {
            if (@event == null)
            {
                return BadRequest();
            }
            var newEvent = await _eventService.AddEvent(@event);
            if (newEvent != null) 
                if (await _eventService.SaveChangesAsync())
                    return Ok(newEvent.Id);
            return Forbid();
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
        /// <response code="403">Access forbidden</response>
        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Put([FromBody] ModifyEventDTO @event, [FromRoute] int id)
        {
            if (@event == null)
                return BadRequest();

            if (_eventService.ModifyEvent(@event, id))
                if (await _eventService.SaveChangesAsync())
                    return Ok();
            else
                return Forbid();
            return BadRequest();
        }
        /// <summary>
        /// Get events, can specify Location, exact month in m/yyyy format and user 
        /// </summary>
        /// <param name="location"></param>
        /// <param name="monthAndYear"></param> 
        /// <param name="userId"></param> 
        /// <param name="organiserID"></param> 
        /// <response code="200">Success, events returned</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetEvents(string location = null, string monthAndYear= null, string userId= null, string organiserId =null)
        {
            var events = await _eventService.GetEvents(location, monthAndYear, userId, organiserId);
            return Ok(events);
        }
        /// <summary>
        /// Get event by id 
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Success, event returned</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public async Task<IActionResult> GetEventById([FromRoute] int id)
        {
            var foundEvent = await _eventService.GetEventById(id);

            if (foundEvent == null)
                return BadRequest();
            else
                return Ok(foundEvent);
        }
        /// <summary>
        /// Get ticket in pdf
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Success, ticket returned</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("generatePDF/{id}")]
        public IActionResult GeneratePDF([FromRoute] int id)
        {
            var pdf = _eventUserService.GeneratePDF(id);

            if (pdf == null)
                return BadRequest();
            else
                return File(pdf, "application/pdf", "ticket.pdf");
        }
    }
}
