using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.CarpoolDTOs;
using Application.Interfaces;
using System;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class CarpoolController : ControllerBase
    {
        private readonly ICarpoolService _carpoolService;

        public CarpoolController(ICarpoolService carpoolService)
        {
            _carpoolService = carpoolService;
        }
        /// <summary>
        /// Add carpool, driverID is taken from logged user, no need to send it in body
        /// </summary>
        /// <param name="carpool"></param> 
        /// <response code="204">Success, carpool added</response>
        /// <response code="400">Something went wrong</response>
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Post([FromBody] CreateCarpoolDTO carpool)
        {
            if (carpool == null)
            {
                return BadRequest();
            }
            if (await _carpoolService.AddEvent(carpool))
                if (await _carpoolService.SaveChangesAsync())
                {
                    return NoContent();
                }
            return BadRequest();
        }
        /// <summary>
        /// Delete carpool
        /// </summary>
        /// <param name="id"></param> 
        /// <response code="204">Success, carpool deleted</response>
        /// <response code="400">Something went wrong</response>
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (_carpoolService.DeleteCarpool(id))
                if (await _carpoolService.SaveChangesAsync())
                    return NoContent();
            return NotFound();
        }
        /// <summary>
        /// Modify carpool 
        /// </summary>
        /// <param name="carpool"></param>
        /// <param name="id"></param> 
        /// <response code="200">Success, carpool modified</response>
        /// <response code="400">Something went wrong</response>
        [HttpPatch]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Put([FromBody] ModifyCarpoolDTO carpool, [FromRoute] int id)
        {
            if (carpool == null)
                return BadRequest();

            if (_carpoolService.ModifyCarpool(carpool, id))
                if (await _carpoolService.SaveChangesAsync())
                    return Ok();

            return BadRequest();
        }
        /// <summary>
        /// Get carpools, can specify number of month by order and user 
        /// </summary>
        /// <param name="MonthId"></param> 
        /// <param name="UserId"></param> 
        /// <response code="200">Success, carpools returned</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetEvents(string MonthId = null, string UserId = null)
        {
            var events = await _carpoolService.GetCarpools(MonthId, UserId);
            return Ok(events);
        }
    }
}