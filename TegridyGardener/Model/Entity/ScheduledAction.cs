using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class ScheduledAction
    {
        public int Id { get; set; }
        
        public int AmountOfWaterMilliliters { get; set; }

        public Guid PlantId { get; set; }
        
        [ForeignKey("PlantId")]
        public Plant Plant { get; set; }

        public string ImagePath { get; set; }
        
        public DateTime? ScheduledDate { get; set; }

        public DateTime? ExecutionDate { get; set; }

        public string Recommendation { get; set; }

        public bool IsDone { get; set; }
    }
}