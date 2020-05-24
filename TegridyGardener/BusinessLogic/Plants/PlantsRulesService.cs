using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Model.Dto;
using Persistence;

namespace BusinessLogic
{
    public class PlantsRulesService : IPlantsRulesService
    {
        private readonly TegridyDbContext _dbContext;

        public PlantsRulesService(TegridyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<PlantRule> GetUserRules(int userId)
        {
            var rules = _dbContext.Users
                .Include(x => x.PlantsGroups)
                .ThenInclude(x => x.Plants).ThenInclude(x => x.Rule)
                .FirstOrDefault(x => x.Id == userId).PlantsGroups.SelectMany(y => y.Plants.Select(
                    z => new PlantRule()
                    {
                        Days = z.Rule.Days,
                        PlantId = z.Id,
                        UserId = userId
                    }));

            return rules;
        }
    }
}