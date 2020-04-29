using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Model;
using TegridyGardenerDbContext;

namespace BusinessLogic
{
    public class PlantInfoService: IPlantInfoService
    {
        private readonly TegridyDbContext _dbContext;

        public PlantInfoService(TegridyDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IEnumerable<PlantInfo> GetPlantInfo()
        {
            return _dbContext.PlantsInfo.Include(x=>x.Rule).ToList();
        }
    }

    public interface IPlantInfoService
    {
        IEnumerable<PlantInfo> GetPlantInfo();
    }
}