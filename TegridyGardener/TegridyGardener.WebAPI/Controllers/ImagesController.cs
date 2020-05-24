using System.IO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace TegridyGardener.WebAPI.Controllers
{
    [Route("[controller]")]
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    public class ImagesController: ControllerBase
    {
        private readonly IHostingEnvironment _env;

        public ImagesController(IHostingEnvironment env)
        {
            _env = env;
        }
        
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetImage(string name)
        {
            var path = Path.Combine(_env.ContentRootPath, $"images/{name}.jpg");

            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");

        }
    }
}