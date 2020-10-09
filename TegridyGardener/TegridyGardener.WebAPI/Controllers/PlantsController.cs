using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using BusinessLogic;
using BusinessLogic.FileHandling;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Model.Dto;
using Persistence;

namespace TegridyGardener.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    public class PlantsController : ControllerBase
    {
        private readonly IPlantsGroupService _groupService;
        private readonly IPlantCrudService _plantCrudService;
        private readonly IPlantInfoService _plantInfoService;
        private readonly IHostingEnvironment _env;

        public PlantsController(
            IPlantsGroupService groupService,
            IPlantCrudService plantCrudService,
            IPlantInfoService plantInfoService,
            IHostingEnvironment env,
            TegridyDbContext dbContext)
        {
            _groupService = groupService;
            _plantCrudService = plantCrudService;
            _plantInfoService = plantInfoService;
            _env = env;
        }

        [HttpGet]
        [Route("user/{userId}")]
        [EnableCors("AllowAll")]
        public IActionResult GetUserPlants(int userId)
        {
            var plants = _groupService.GetUserPlants(userId);
            return Ok(plants);
        }

        [HttpPost]
        [Route("{groupId}/{plantId}")]
        public IActionResult MoveToAnotherGroup(int groupId, string plantId)
        {
            _plantCrudService.AddPlantToGroup(plantId, groupId);

            return Ok();
        }

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            var path = Path.Combine(_env.ContentRootPath, $"clarissa-carbungco-chSJTnKTuIs-unsplash.jpg");

            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");
        }

        [HttpPost]
        public IActionResult AddPlant([FromForm] PlantDto plantDto)
        {
            var fileName = Guid.NewGuid();
            HandleGettingFile(fileName);
            plantDto.ImageName = fileName.ToString();
            
            _plantCrudService.AddPlant(plantDto);
            return Ok();
        }

        [HttpDelete]
        [Route("{plantId}")]
        public IActionResult RemovePlant(Guid plantId)
        {
            _plantCrudService.RemovePlant(plantId);

            return Ok();
        }

        [HttpGet]
        [Route("types")]
        public IActionResult GetTypes()
        {
            var types = _plantInfoService.GetPlantInfo();
            return Ok(types);
        }


        [HttpPost]
        [Route("group/{userId}/{name}")] // Use JWT to get user Id
        public IActionResult AddGroup(int userId, string name)
        {
            _groupService.CreateGroup(userId, name);
            return Ok();
        }

        private async void HandleGettingFile(Guid fileName)
        {
            if (!Request.Form.Files.Any())
            {
                return;
            }
            var file = Request.Form.Files[0];
            var imagesPath = Path.Combine(_env.ContentRootPath, "images");
            var filePath = Path.Combine(imagesPath, fileName.ToString()+".jpg");
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
    }
}