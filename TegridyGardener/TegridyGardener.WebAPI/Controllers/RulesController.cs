using BusinessLogic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace TegridyGardener.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    public class RulesController : ControllerBase
    {
        private readonly IPlantsRulesService _plantsRulesService;

        public RulesController(IPlantsRulesService plantsRulesService)
        {
            _plantsRulesService = plantsRulesService;
        }

        [HttpGet]
        [Route("user/{userId}")]
        [EnableCors("AllowAll")]
        public IActionResult UserRules(int userId)
        {
            var rules = _plantsRulesService.GetUserRules(userId);

            return Ok(rules);
        }
    }
}