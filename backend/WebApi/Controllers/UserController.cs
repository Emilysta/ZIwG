﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Cors;

namespace WebApi.Controllers
{
    [EnableCors("AllowAll")]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IEventUsersService _eventUsersService;
        private readonly ICarpoolUsersService _carpoolUsersService;

        public UserController(ILoggingService loggingService, IUserService userService, IEventUsersService eventUsersService, ICarpoolUsersService carpoolUsersService)

        {
            _loggingService = loggingService;
            _userService = userService;
            _eventUsersService = eventUsersService;
            _carpoolUsersService = carpoolUsersService;

        }
        /// <summary>
        /// GetCurrentUserData
        /// </summary>
        /// <response code="200">Success, logged out</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [Route("currentUserData")]
        public async Task<IActionResult> CurrentUserData()
        {
            var result = await _userService.GetCurrenUserData();
            if (result == null)
                return BadRequest();
            else
                return Ok(result);
        }
        /// <summary>
        /// GetCurrentUserId
        /// </summary>
        /// <response code="200">Success, logged out</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [Route("currentUserId")]
        public IActionResult CurrentUserId()
        {
            var result = _userService.GetCurrenUserId();
            return Ok(result);
        }
        /// <summary>
        /// Logout
        /// </summary>
        /// <response code="200">Success, logged out</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            var result = await _loggingService.Logout();
            return Ok();
        }
        /// <summary>
        /// Add profile picture 
        /// </summary>
        /// <param name="fileObj"></param> 
        /// <response code="200">Success, photo added</response>
        /// <response code="400">Something went wrong</response>
        [HttpPost]
        [Route("savePhoto")]
        public async Task<IActionResult> SavePhoto([FromForm] FileUpload fileObj)
        {
            if (await _userService.UploadProfilePicture(fileObj))
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
            var user = await _loggingService.Login(model);
            if (user != null)
                return Ok(user.Id);
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
        [HttpGet]
        [Route("google-login")]
        public IActionResult GoogleLogin()
        {
            string redirectUrl = Url.Action("GoogleResponse", "User");
            var properties = _loggingService.LoginWithGoogle(redirectUrl);
            return new ChallengeResult("Google", properties);
        }
        /// <summary>
        /// GoogleResponse
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GoogleResponse()
        {
            if (await _loggingService.GetGoogleResponse())
                return Ok();
            return BadRequest();
        }
        /// <summary>
        /// Change user data
        /// </summary>
        /// <param name="diplayData"></param>
        /// <response code="200">Success, user modified</response>
        /// <response code="400">Wrong user ID</response>
        [HttpPatch]
        [Route("changeUserData")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangeUserData([FromBody] DisplayDataDTO diplayData)
        {
            if (diplayData == null)
                return BadRequest();

            if (_userService.ChangeDisplayData(diplayData))
                if (await _userService.SaveChangesAsync())
                    return Ok();

            return BadRequest();
        }
        /// <summary>
        /// Delete user
        /// </summary>
        /// <response code="204">Success, user removed</response>
        /// <response code="400">Something went wrong</response> 
        [HttpDelete]
        [Route("deleteUser")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete()
        {
            if (_userService.DeleteUser())
                if (await _userService.SaveChangesAsync())
                    return NoContent();
            return NotFound();
        }
        /// <summary>
        /// Signs current logged user to an event
        /// </summary>
        /// <param name="eventId"></param> 
        /// <response code="204">Success, user added</response>
        /// <response code="400">Wrong EventID or no logged user or no empty slots</response> 
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
        /// <summary>
        /// Signs current logged user to carpool
        /// </summary>
        /// <param name="carpoolId"></param> 
        /// <response code="204">Success, user added</response>
        /// <response code="400">Wrong EventID or no logged user or no empty slots</response> 
        [HttpPost]
        [Route("joinRide/{carpoolId}")]
        [AllowAnonymous]
        public IActionResult SignToCarpool([FromRoute] int carpoolId)
        {
            var result = _carpoolUsersService.SignCurrentUserToCarpool(carpoolId);
            if (result)
                return NoContent();
            else
                return BadRequest();
        }
        /// <summary>
        /// Removes current logged user from carpool
        /// </summary>
        /// <param name="carpoolId"></param> 
        /// <response code="204">Success user removed</response>
        /// <response code="400">If wrong ID or no logged user</response> 
        [HttpDelete]
        [Route("leaveRide/{carpoolId}")]
        [AllowAnonymous]
        public IActionResult SignOutFromfCarpool([FromRoute] int carpoolId)
        {
            var result = _carpoolUsersService.SignOutCurrentUserFromCarpool(carpoolId);
            if (result)
                return NoContent();
            else
                return BadRequest();
        }

        /// <summary>
        /// Sends password recovery email
        /// </summary>
        /// <param name="userEmail"></param> 
        /// <response code="204">Success password recovery eamil send</response>
        /// <response code="400">Wrong userEmail</response> 
        [HttpPost]
        [Route("sendPasswordRecoveryEmail/{userEmail}")]
        [AllowAnonymous]
        public async Task<IActionResult> SendPasswordRecoveryEmail([FromRoute] string userEmail)
        {
            var result = await _loggingService.SendPasswordRecoveryEmail(userEmail);
            if (result)
                return NoContent();
            else
                return BadRequest();
        }

        /// <summary>
        /// Resets user password
        /// </summary>
        /// <param name="userEmail"></param> 
        /// <response code="204">User password changed</response>
        /// <response code="400">Wrong userEmail, token or password</response> 
        [HttpPost]
        [Route("resetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPasword(ReserPasswordDTO resetPasswordDTO)
        {
            var result = await _loggingService.ResetPassword(resetPasswordDTO);
            if (result)
                return NoContent();
            else
                return BadRequest();
        }
        /// <summary>
        /// Get ticket in pdf
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Success, ticket returned</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        [AllowAnonymous]
        [Route("generateTicket/{id}")]
        public IActionResult GeneratePDF([FromRoute] int id)
        {
            var pdf = _eventUsersService.GeneratePDF(id);

            if (pdf == null)
                return BadRequest();
            else
                return File(pdf, "application/pdf", "ticket.pdf");
        }
    }
}
