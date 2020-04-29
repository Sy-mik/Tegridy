using System;
using System.Collections.Generic;
using BusinessLogic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model.Dto;

namespace TegridyGardener.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    public class ScheduledActionsController : ControllerBase
    {
        private readonly IPlantScheduledActionService _scheduledActionService;
        private readonly IUserAuthService _userAuthService;

        public ScheduledActionsController(IPlantScheduledActionService scheduledActionService, IUserAuthService userAuthService)
        {
            _scheduledActionService = scheduledActionService;
            _userAuthService = userAuthService;
        }
        
        [HttpGet]
        [Route("user/{userId}")]
        [EnableCors("AllowAll")]
        public IEnumerable<PlantsActionDto> Get(int userId)
        {
            var scheduledActions = _scheduledActionService.GetScheduledForUser(userId);
            return scheduledActions;
        }
        
        [HttpDelete]
        [Route("{actionId}")]
        [EnableCors("AllowAll")]
        public IActionResult Remove(int actionId)
        {
            _scheduledActionService.Invoke(actionId);
            return Ok();
        }

        
        [HttpGet]
        [Route("{actionId}")]
        [EnableCors("AllowAll")]
        public IActionResult Invoke(int actionId)
        {
            _scheduledActionService.Invoke(actionId);
            return Ok();
        }
        
        [HttpGet]
        [Route("plants/{plantId}")]
        [EnableCors("AllowAll")]
        public IActionResult GetSuggestedActionForPlant(string plantId)
        {
            var action = _scheduledActionService.GetSuggestedActionForPlant(new Guid(plantId));
            return Ok(action);
        }
        
        [HttpPost]
        [Route("")]
        [EnableCors("AllowAll")]
        public IActionResult AddActionForPlant([FromBody] PlantsActionDto actionDto)
        {
            var user = _userAuthService.GetUser(actionDto.UserId);
            _scheduledActionService.AddPlantsAction(user, actionDto);
            return Ok();
        }
    }
}