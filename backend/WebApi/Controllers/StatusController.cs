using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        /// <summary>
        /// Check if service running
        /// </summary>
        /// <response code="200">Success, it's working</response>
        /// <response code="400">Something went wrong</response>
        [HttpGet]
        public IActionResult Test()
        {
            return Ok("It's working");
        }
    }
}
