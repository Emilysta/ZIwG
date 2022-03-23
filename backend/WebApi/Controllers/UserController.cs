using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILoggingService _loggingService;

        public UserController(ILoggingService loggingService)
        {
            _loggingService = loggingService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO model)
        {
            if (await _loggingService.Login(model))
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDTO model)
        {
            if (await _loggingService.Register(model))
                return Ok();
            return BadRequest();
        }

        [HttpPatch]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Put([FromBody] ModifyDTO @event, [FromRoute] string id)
        {
            if (@event == null)
                return BadRequest();

            if (_loggingService.Modify(@event, id))
                if (await _loggingService.SaveChangesAsync())
                    return Ok();

            return BadRequest();
        }
    }
}
