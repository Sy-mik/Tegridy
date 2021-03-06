using System;
using System.Collections.Generic;
using System.Linq;
using BusinessLogic.Mapping;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Dto;
using Persistence;

namespace BusinessLogic
{
    public class PlantsScheduledActionService : IPlantScheduledActionService
    {
        private readonly TegridyDbContext _dbContext;

        public PlantsScheduledActionService(TegridyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddPlantsAction(User user, PlantsActionDto plantsActionDto)
        {
            if (plantsActionDto.Days != Days.NONE)
            {
                try
                {
                    var plant = _dbContext.Plants.FirstOrDefault(x =>
                        x.Id == plantsActionDto.PlantId);

                    var rule = new Rule()
                    {
                        Days = plantsActionDto.Days,
                        WaterInMilliliters = plantsActionDto.AmountOfWaterMilliliters,
                    };

                    plant.Rule = rule;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

            var action = new ScheduledAction
            {
                ImagePath = plantsActionDto.ImageUri,
                AmountOfWaterMilliliters = plantsActionDto.AmountOfWaterMilliliters,
                ScheduledDate = plantsActionDto.ScheduledDate
            };

            action.PlantId = plantsActionDto.PlantId;

            user.PlantsAudits.Add(action);

            
            _dbContext.SaveChanges();

            var rules = _dbContext.Rules.ToString();
        }

        public PlantsActionDto GetSuggestedActionForPlant(Guid plantId)
        {
            var lastAction = _dbContext.PlantsAudit
                .Include(x => x.Plant)
                .ThenInclude(x => x.Rule)
                .OrderByDescending(x => x.Id)
                .FirstOrDefault(x => x.Plant.Id.Equals(plantId));

            if (lastAction == null)
            {
                var plant = _dbContext.Plants
                    .Include(x => x.Rule)
                    .FirstOrDefault(x => x.Id.Equals(plantId));

                return CreatePlantAction(plant, plant.Rule.WaterInMilliliters, DateTime.UtcNow.AddMinutes(10)).ToDto();
            }

            var newActionDate = CalculateUTCDateOfNextAction(lastAction);
            var action = CreatePlantAction(lastAction.Plant, lastAction.Plant.Rule.WaterInMilliliters, newActionDate);

            return action.ToDto();
        }

        public ScheduledAction CreatePlantAction(Plant plant, int amountOfWaterInMl, DateTime scheduledDate)
        {
            var newAction = new ScheduledAction()
            {
                Plant = plant,
                ScheduledDate = scheduledDate,
                AmountOfWaterMilliliters = amountOfWaterInMl
            };
            return newAction;
        }

        // Ogarnij kiedy scheduled action jest null
        public DateTime CalculateUTCDateOfNextAction(ScheduledAction lastAction)
        {
//            var dateOfLastAction = lastAction.ExecutionDate;
//            var hoursBetweenWatering = lastAction.Plant.Rule;
//
//            var dateOfNextAction = dateOfLastAction?.AddHours(hoursBetweenWatering) ?? DateTime.UtcNow.AddMinutes(10);
//
//            if (dateOfNextAction <= DateTime.UtcNow)
//            {
//                dateOfNextAction = DateTime.UtcNow.AddMinutes(10);
//            }

            return DateTime.UtcNow.AddMinutes(10);;
        }

        public IEnumerable<PlantsActionDto> GetScheduledForUser(int userId)
        {
            var user = _dbContext.Users.Include(x => x.PlantsAudits)
                .ThenInclude(x => x.Plant)
                .ThenInclude(y => y.PlantInfo)
                .FirstOrDefault(x => x.Id == userId);
            return user.PlantsAudits.Where(x => !x.IsDone).OrderBy(x => x.ScheduledDate).Select(x => x.ToDto());
        }

        public void Invoke(int auditId)
        {
            _dbContext.PlantsAudit
                .FirstOrDefault(x => x.Id == auditId).IsDone = true;
            _dbContext.SaveChanges();
        }

        public void Remove(int auditId)
        {
            var audit = _dbContext.PlantsAudit
                .FirstOrDefault(x => x.Id == auditId);
            _dbContext.Remove(audit);
            _dbContext.SaveChanges();
        }

        public void UpdateDate(PlantsActionDto dto)
        {
            var audit = _dbContext.PlantsAudit
                .FirstOrDefault(x => x.Id == dto.Id);
            audit.ScheduledDate = dto.ScheduledDate;
            _dbContext.SaveChanges();
        }

        public void MarkAsDone(PlantsActionDto dto)
        {
            var audit = _dbContext.PlantsAudit
                .FirstOrDefault(x => x.Id == dto.Id);
            audit.ExecutionDate = dto.ExecutionDate;
            audit.IsDone = true;
            _dbContext.SaveChanges();
        }

        private DateTime GetScheduledDateTime()
        {
            return DateTime.UtcNow.AddDays(1);
        }
    }
}