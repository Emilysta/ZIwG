using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Domain.Contexts;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;

        public UserController(ILoggingService loggingService, IUserService userService, DataBaseContext context)
        {
            _loggingService = loggingService;
            _userService = userService;
            _context = context;
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

            var claims = result.Principal.Identities.FirstOrDefault()
                .Claims.Select(claim => new
                {
                    claim.Issuer,
                    claim.OriginalIssuer,
                    claim.Type,
                    claim.Value
                });

            var email = claims.ElementAt(4).Value;
            var checkUser = _context.Users.Where(x => x.Email == email).SingleOrDefault();
            if (checkUser == null)
            {
                var usertoadd = new User
                {
                    DisplayName = claims.ElementAt(1).Value,
                    FirstName = claims.ElementAt(2).Value,
                    LastName = claims.ElementAt(3).Value,
                    UserName = email,
                    Email = email
                };
                await _context.Users.AddAsync(usertoadd);
                await _userService.SaveChangesAsync();
                return Ok();
            }
            return Ok();
        }

        [HttpPatch]
        [Route("changeDisplayName/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangeDisplayName([FromBody] DisplayNameDTO diplayName, [FromRoute] string id)
        {
            if (diplayName == null)
                return BadRequest();

            if (_userService.ChangeDisplayName(diplayName, id))
                if (await _userService.SaveChangesAsync())
                    return Ok();

            return BadRequest();
        }
    }
}
