using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.DependencyInjection;
using TegridyGardenerDbContext;

namespace Model
{
    public static class MockedData
    {
        public static void Initialize(TegridyDbContext context)
        {
           
                // Look for any board games.
                if (context.Users.Any())
                {
                    return; // Data was already seeded
                }

                var plantInfo = new PlantInfo()
                {
                    Id = 1,
                    Name = "Test",
                    Description = "Test",
                    Rule = new Rule()
                    {
                        HoursBetweenWatering = 24,
                        WaterInMilliliters = 100
                    }
                };
                
                var plant = new Plant()
                {
                    Id = Guid.NewGuid(),
                    Name = "Gardenia",
                    ImageUri = "https://www.weranda.pl/cache/700-800/bfe41a533e4ae75fe529cc4ccb6c5a63/5532_12514559960.jpg",
                    Rule = new Rule()
                    {
                        Id = 1,
                        HoursBetweenWatering = 12,
                        WaterInMilliliters = 24
                    },
                    PlantInfo = plantInfo
                };
                var scheduledAction = new ScheduledAction()
                {
                    Id = 1,
                    Plant = plant,
                    Recommendation = "",
                    IsDone = false,
                    ScheduledDate = DateTime.Now.AddHours(3),
                    AmountOfWaterMilliliters = 24
                };
                var user = new User()
                {
                    Id = 1,
                    Email = "example@gmail.com",
                    PlantsGroups =
                    {
                        new PlantsGroup()
                        {
                            Id = 1,
                            Name = "Default Group",
                            Plants = new List<Plant>(){plant}
                        }
                    },
                    PlantsAudits = { scheduledAction }
                };

                context.PlantsAudit.Add(scheduledAction);
                context.PlantsInfo.Add(plantInfo);
                context.Plants.Add(plant);
                context.Users.Add(user);

                context.SaveChanges();
        }
    }
}