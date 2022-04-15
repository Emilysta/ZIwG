﻿using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Application.DTOs;
using Newtonsoft.Json;
using Domain.Entities;
using System.IO;
using Domain.Contexts;
using Microsoft.AspNetCore.Http;

namespace WebApi.Controllers
{
    
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IEventUsersService _eventUsersService;
        private readonly DataBaseContext _context;

        public UserController(ILoggingService loggingService, IUserService userService, IEventUsersService eventUsersService, DataBaseContext context)
        {
            _loggingService = loggingService;
            _userService = userService;
            _eventUsersService = eventUsersService;
            _context = context;
        }
        /// <summary>
        /// Add profile picture 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="fileObj"></param> 
        /// <response code="200">Success, photo added</response>
        /// <response code="400">Wrong user ID</response>
        [HttpPost]
        [Route("savePhoto/{id}")]
        public async Task<IActionResult> SavePhoto([FromRoute] string id, [FromForm] FileUpload fileObj)
        {
            if (await _userService.UploadProfilePicture(fileObj, id))
            {
                return Ok();
            }
            return BadRequest();
        }
        /// <summary>
        /// Login user
        /// </summary>
        /// <param name="model"></param>
        /// <response code="200">Success, user logged in</response>
        /// <response code="400">Something went wrong</response>
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO model)
        {
            if (await _loggingService.Login(model))
                return Ok();
            return BadRequest();
        }
        /// <summary>
        /// Register user, password requires a lowercase and uppercase letter, numeric and special character and at least 6 character length.
        /// </summary>
        /// <param name="model"></param>
        /// <response code="200">Success, user created</response>
        /// <response code="400">Something went wrong</response>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDTO model)
        {
            if (await _loggingService.Register(model))
                return Ok();
            return BadRequest();
        }
        /// <summary>
        /// Login with google
        /// </summary>
        /// <response code="400">Something went wrong</response>
        //localhost:44394/api/user/google-login
        [HttpGet]
        [Route("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
        /// <summary>
        /// Change user data by id
        /// </summary>
        /// <response code="200">Success, registered</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [Route("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (await _loggingService.RegisterWithGoogle(result))
                if (await _loggingService.SaveChangesAsync())
                    return Ok();
            return Ok();
        }
        /// <summary>
        /// Change user data by id
        /// </summary>
        /// <param name="diplayData"></param>
        /// <param name="id"></param> 
        /// <response code="200">Success, user modified</response>
        /// <response code="400">Wrong user ID</response>
        [HttpPatch]
        [Route("changeUserData/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangeUserData([FromBody] DisplayDataDTO diplayData, [FromRoute] string id)
        {
            if (diplayData == null)
                return BadRequest();

            if (_userService.ChangeDisplayData(diplayData, id))
                if (await _userService.SaveChangesAsync())
                    return Ok();

            return BadRequest();
        }
        /// <summary>
        /// Delete user by id
        /// </summary>
        /// <param name="id"></param> 
        /// <response code="204">Success, user removed</response>
        /// <response code="400">Wrong user ID</response> 
        [HttpDelete]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (_userService.DeleteUser(id))
                if (await _userService.SaveChangesAsync())
                    return NoContent();
            return NotFound();
        }
        /// <summary>
        /// Signs current logged user to an event
        /// </summary>
        /// <param name="eventId"></param> 
        /// <response code="204">Success, user added</response>
        /// <response code="400">Wrong EventID or no logged user</response> 
        [HttpPost]
        [Route("sign/{eventId}")]
        [AllowAnonymous]
        public IActionResult SignToEvent([FromRoute] int eventId)
        {
            var result = _eventUsersService.SignCurrentUserToEvent(eventId);
            if (result)
                return NoContent();
            else
                return BadRequest();
        }
        /// <summary>
        /// Removes current logged user from an event
        /// </summary>
        /// <param name="eventId"></param> 
        /// <response code="204">Success user removed</response>
        /// <response code="400">If wrong ID or no logged user</response> 
        [HttpDelete]
        [Route("signout/{eventId}")]
        [AllowAnonymous]
        public IActionResult SignOutFromfEvent([FromRoute] int eventId)
        {
            var result = _eventUsersService.SignOutCurrentUserFromEvent(eventId);
            if (result)
                return NoContent();
            else
                return BadRequest();
        }
    }
}
