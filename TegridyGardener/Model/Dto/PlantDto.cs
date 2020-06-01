using System;
using System.Collections.Generic;

namespace Model.Dto
{
    public class PlantDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public int? PlantInfoId { get; set; }

        public int WateringInMililiters { get; set; }
        public int UserId { get; set; }

        public int GroupId { get; set; }
        
        public string ImageName { get; set; }
        
        public string ImageUri { get; set; }
        
        public PlantRuleDto Rule { get; set; }
    }
}