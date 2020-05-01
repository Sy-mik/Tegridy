using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Dto;
using Persistence;

namespace BusinessLogic
{
    public class PlantsGroupService : IPlantsGroupService
    {
        private readonly TegridyDbContext _dbContext;

        public PlantsGroupService(TegridyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateGroup(int userId, string name)
        {
            var user = _dbContext.Users.Include(x => x.PlantsGroups)
                .FirstOrDefault(x => x.Id == userId);
            
            var plantGroup = new PlantsGroup()
            {
                Name = name
            };
            
            user.PlantsGroups.Add(plantGroup);
            _dbContext.Add(plantGroup);

            _dbContext.SaveChanges();
        }
        

        public IEnumerable<Plant> GetUserPlants(int userId)
        {
            var plants = _dbContext.Users.Include(x=>x.PlantsGroups)
                .ThenInclude(x=>x.Plants).SelectMany(x=>x.PlantsGroups.SelectMany(y=>y.Plants))
                .ToList();
            return plants;
        }
    }
}
