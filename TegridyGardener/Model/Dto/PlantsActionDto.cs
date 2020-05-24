using System;

namespace Model.Dto
{
    public class PlantsActionDto
    {
        public int Id { get; set; }
        
        public Guid PlantId { get; set; }
        
        public int UserId { get; set; }
        
        public int PlantGroupId { get; set; }
        
        public string Name { get; set; }
        
        public int AmountOfWaterMilliliters { get; set; }
        
        public string ImageUri { get; set; }
        
        public string ImageName { get; set; }

        public string Recommendations { get; set; }

        public DateTime? ScheduledDate { get; set; }
        
        public  Days Days { get; set; }
        
        public DateTime? ExecutionDate { get; set; }
    }
}