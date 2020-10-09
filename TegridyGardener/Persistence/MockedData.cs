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
        
        public static Plant SecondPlant = new Plant()
        {
            Id = Guid.NewGuid(),
            Name = "Fittonia",
            ImageUri = "https://digitalprodyatesauweb.blob.core.windows.net/cache/3/4/b/7/e/5/34b7e5bba0c4080282852a78213404c050a41144.png",
            Rule = new Rule()
            {
                Id = 3,
                WaterInMilliliters = 24
            },
            PlantInfo = plantInfo
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
                            Plants = new List<Plant>(){plant, SecondPlant}
                        }
                    },
                };
    }
}