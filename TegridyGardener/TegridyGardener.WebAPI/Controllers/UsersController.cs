using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace TegridyGardener.WebAPI.Controllers
{
    [ApiController]
    [EnableCors("AllowAll")]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        [EnableCors("AllowAll")]
        public IActionResult Get()
        {
            return Ok();
        }

    }
}