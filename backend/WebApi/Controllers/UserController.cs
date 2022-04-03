using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.UserDTOs;
using Application.Interfaces;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;

        public UserController(ILoggingService loggingService, IUserService userService)
        {
            _loggingService = loggingService;
            _userService = userService;
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

        //localhost:44394/api/user/google-login
        [HttpGet]
        [Route("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

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
    }
}
