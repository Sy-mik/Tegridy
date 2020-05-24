using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace Model
{
    public static class MockedData
    {
        public static  PlantInfo plantInfo = new PlantInfo()
                {
                    Id = 1,
                    Name = "Test",
                    Description = "Test",
                    Rule = new Rule()
                    { Id = 1,
                        WaterInMilliliters = 100
                    }
                };
                
        public static Plant plant = new Plant()
                {
                    Id = Guid.NewGuid(),
                    Name = "Gardenia",
                    ImageUri = "https://www.weranda.pl/cache/700-800/bfe41a533e4ae75fe529cc4ccb6c5a63/5532_12514559960.jpg",
                    Rule = new Rule()
                    {
                        Id = 2,
                        WaterInMilliliters = 24
                    },
                    PlantInfo = plantInfo
                };
                
                public static ScheduledAction scheduledAction = new ScheduledAction()
                {
                    Id = 1,
                    Plant = plant,
                    Recommendation = "",
                    IsDone = false,
                    ScheduledDate = DateTime.Now.AddHours(3),
                    AmountOfWaterMilliliters = 24
                };
                
                 
                public static ScheduledAction scheduledAction1 = new ScheduledAction()
                {
                    Id = 2,
                    Plant = plant,
                    Recommendation = "",
                    IsDone = false,
                    ScheduledDate = DateTime.Now.AddHours(3),
                    AmountOfWaterMilliliters = 24
                }; 
                public static ScheduledAction scheduledAction2 = new ScheduledAction()
                {
                    Id = 3,
                    Plant = plant,
                    Recommendation = "",
                    IsDone = false,
                    ScheduledDate = DateTime.Now.AddHours(3),
                    AmountOfWaterMilliliters = 24
                };
                
                 
                public static ScheduledAction scheduledAction3 = new ScheduledAction()
                {
                    Id = 4,
                    Plant = plant,
                    Recommendation = "",
                    IsDone = false,
                    ScheduledDate = DateTime.Now.AddHours(3),
                    AmountOfWaterMilliliters = 24
                };
                
               public static User user = new User()
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
                    PlantsAudits = { scheduledAction,scheduledAction1,scheduledAction2,scheduledAction3 }
                };
    }
}