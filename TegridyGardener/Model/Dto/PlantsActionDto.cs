using System;

namespace Model.Dto
{
    public class PlantsActionDto
    {
        public int AuditId { get; set; }
        
        public string PlantId { get; set; }
        
        public int UserId { get; set; }
        
        public int PlantGroupId { get; set; }
        
        public string Name { get; set; }
        
        public double AmountOfWaterMilliliters { get; set; }
        
        public string ImageUri { get; set; }

        public string Recommendations { get; set; }

        public DateTime? ScheduledDate { get; set; }
        
        public DateTime? ExecutionDate { get; set; }
    }
}