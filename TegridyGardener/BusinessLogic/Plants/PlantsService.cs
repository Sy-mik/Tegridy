using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Dto;
using Persistence;

namespace BusinessLogic
{
    public class PlantCrudService : IPlantCrudService
    {
        private readonly TegridyDbContext _dbContext;

        public PlantCrudService(TegridyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddPlant(PlantDto plantDto)
        {
            var user = _dbContext.Users.Include(x => x.PlantsGroups)
                .FirstOrDefault(x => x.Id == plantDto.UserId);
            var plant = CreatePlant(plantDto);

            AddPlantToUser(user, plant, plantDto.GroupId);
        }

        public void AddPlantToGroup(string plantId, int plantGroupId)
        {
            Guid g = new Guid(plantId);
            
            var plantGroup = _dbContext.PlantsGroups.FirstOrDefault(x => x.Id == plantGroupId);
            var plant = _dbContext.Plants.FirstOrDefault(x => x.Id == g);
            plantGroup.Plants.Add(plant);
            
            _dbContext.SaveChanges();
        }

        public void RemovePlant(Guid plantId)
        {
            var plant = _dbContext.Plants.FirstOrDefault(x => x.Id == plantId);
            _dbContext.Plants.Remove(plant);
            _dbContext.SaveChanges();
        }

        private Plant CreatePlant(PlantDto plantDto)
        {
            var plantInfo = _dbContext.PlantsInfo.FirstOrDefault(x => x.Id == plantDto.PlantInfoId);
            var plant = new Plant
            {
                Name = plantDto.Name,
                PlantInfo = plantInfo,
                ImageName =  plantDto.ImageName
            };

            return plant;
        }

        private void AddPlantToUser(User user, Plant plant, int plantGroupId)
        {
            PlantsGroup plantsGroup;
            if (!user.PlantsGroups.Any() || plantGroupId == 0)
            {
                plantsGroup = CreateDefaultPlantGroup();
                user.PlantsGroups.Add(plantsGroup);
            }
            else
            {
                plantsGroup = _dbContext.PlantsGroups.FirstOrDefault(x => x.Id == plantGroupId);
            }

            plantsGroup.Plants.Add(plant);

            _dbContext.SaveChanges();
        }

        private PlantsGroup CreateDefaultPlantGroup()
        {
            var plantsGroup = new PlantsGroup
            {
                Name = "Default group"
            };
            return plantsGroup;
        }
    }
}