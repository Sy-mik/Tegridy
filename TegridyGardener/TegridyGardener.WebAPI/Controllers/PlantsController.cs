using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using BusinessLogic;
using BusinessLogic.FileHandling;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model.Dto;

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
        private readonly IFileHandler _fileHandler;
        private readonly IPlantInfoService _plantInfoService;

        public PlantsController(
            IPlantsGroupService groupService,
            IPlantCrudService plantCrudService, 
            IFileHandler fileHandler, 
            IPlantInfoService plantInfoService)
        {
            _groupService = groupService;
            _plantCrudService = plantCrudService;
            _fileHandler = fileHandler;
            _plantInfoService = plantInfoService;
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

        [HttpPost]
        public IActionResult AddPlant([FromBody] PlantDto plantDto)
        {
            var file = handleGettingFile();
            
            if (file != null)
            {
                var filePath = _fileHandler.SaveFile(file);
                plantDto.FilePath = filePath;
            }

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
            _groupService.CreateGroup(userId ,name);
            return Ok();
        }

        private FileStream handleGettingFile()
        {
            FileStream stream;
            var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
 
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
 
                    using (stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        return stream;
                    }
                }
            
                return null;
                }
    }
}